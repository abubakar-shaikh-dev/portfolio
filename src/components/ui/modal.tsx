'use client';

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Transition,
  type Variants,
} from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DESKTOP_QUERY = '(min-width: 768px)';
const DRAG_CLOSE_OFFSET = 110;
const DRAG_CLOSE_VELOCITY = 550;

// Hydration-safe mount flag without setState-in-effect.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** Semantic style slots, mirroring antd's `styles` API. */
export interface ModalStyles {
  mask?: CSSProperties;
  content?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
}

export interface ModalProps {
  /** Whether the dialog is visible. */
  open?: boolean;
  title?: ReactNode;
  /** Muted helper line under the title (antd Modal.confirm style). */
  description?: ReactNode;
  children?: ReactNode;
  /** Replace the default OK/Cancel footer. Pass `null` to hide the footer. */
  footer?: ReactNode | null;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: ReactNode;
  cancelText?: ReactNode;
  /** Renders the OK button in the destructive style. */
  okDanger?: boolean;
  /** Shows a spinner on the OK button; pair with your own dismissal guard. */
  confirmLoading?: boolean;
  okDisabled?: boolean;
  /** Show the top-right close button (default true). */
  closable?: boolean;
  closeIcon?: ReactNode;
  /** Close when the mask is clicked (default true). */
  maskClosable?: boolean;
  /** Close on Escape (default true). */
  keyboard?: boolean;
  /** Vertically center the dialog on desktop (default true). */
  centered?: boolean;
  /** Dialog width on desktop; mobile always renders a full-width sheet (default 520). */
  width?: number | string;
  /** Show a content skeleton instead of children. */
  loading?: boolean;
  /** Called after the open/close transition finishes. */
  afterOpenChange?: (open: boolean) => void;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  styles?: ModalStyles;
  okButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
  cancelButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
}

function DefaultFooter({
  okText,
  cancelText,
  okDanger,
  confirmLoading,
  okDisabled,
  onOk,
  onCancel,
  okButtonProps,
  cancelButtonProps,
}: Pick<
  ModalProps,
  | 'okText'
  | 'cancelText'
  | 'okDanger'
  | 'confirmLoading'
  | 'okDisabled'
  | 'onOk'
  | 'onCancel'
  | 'okButtonProps'
  | 'cancelButtonProps'
>) {
  return (
    <div className="flex flex-col-reverse gap-2 px-6 pb-5 pt-1 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        {...cancelButtonProps}
        className={`w-full rounded-md border border-border-primary px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-white/40 hover:text-white active:scale-97 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${cancelButtonProps?.className ?? ''}`}
      >
        {cancelText ?? 'Cancel'}
      </button>
      <button
        type="button"
        onClick={onOk}
        disabled={okDisabled || confirmLoading}
        {...okButtonProps}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-[background-color,transform] duration-150 ease-out-premium active:scale-97 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
          okDanger
            ? 'bg-red-500 text-white hover:bg-red-500/90'
            : 'bg-white text-black hover:bg-white/90'
        } ${okButtonProps?.className ?? ''}`}
      >
        {confirmLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {okText ?? 'OK'}
      </button>
    </div>
  );
}

function ModalBodySkeleton() {
  return (
    <div className="animate-pulse space-y-3 py-1" aria-hidden="true">
      <div className="h-4 w-1/3 rounded bg-white/10" />
      <div className="h-3 w-full rounded bg-white/10" />
      <div className="h-3 w-4/5 rounded bg-white/10" />
    </div>
  );
}

/**
 * Ant Design inspired modal. Desktop renders a centered dialog; below the
 * `md` breakpoint it becomes a bottom sheet that can be dragged down to
 * dismiss. Controlled via `open` + `onCancel`; `onOk` does not auto-close,
 * matching antd's component API.
 */
export function Modal({
  open = false,
  title,
  description,
  children,
  footer,
  onOk,
  onCancel,
  okText,
  cancelText,
  okDanger,
  confirmLoading = false,
  okDisabled,
  closable = true,
  closeIcon,
  maskClosable = true,
  keyboard = true,
  centered = true,
  width = 520,
  loading = false,
  afterOpenChange,
  zIndex = 1000,
  className,
  style,
  styles,
  okButtonProps,
  cancelButtonProps,
}: ModalProps) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useBodyScrollLock(open);

  // Move focus into the dialog on open and restore it on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open || !keyboard) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCancel?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, keyboard, onCancel]);

  const panelVariants: Variants = isDesktop
    ? {
        hidden: shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 14, scale: 0.97, filter: 'blur(8px)' },
        visible: shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      }
    : {
        hidden: shouldReduceMotion ? { opacity: 0 } : { y: '100%' },
        visible: shouldReduceMotion ? { opacity: 1 } : { y: 0 },
      };

  const panelTransition: Transition = shouldReduceMotion
    ? { duration: 0.2 }
    : isDesktop
      ? {
          default: { type: 'spring', stiffness: 380, damping: 34 },
          opacity: { duration: 0.25, ease: EASE_OUT },
          filter: { duration: 0.25, ease: EASE_OUT },
        }
      : { type: 'spring', stiffness: 380, damping: 42 };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > DRAG_CLOSE_OFFSET || info.velocity.y > DRAG_CLOSE_VELOCITY) {
      onCancel?.();
    }
  };

  const panelWidth = typeof width === 'number' ? `${width}px` : width;
  const hasBody = loading || children !== undefined;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence onExitComplete={() => afterOpenChange?.(false)}>
      {open && (
        <motion.div
          key="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          style={{ zIndex, ...styles?.mask }}
          className={`fixed inset-0 flex justify-center bg-black/60 backdrop-blur-sm ${
            isDesktop
              ? centered
                ? 'items-center p-6'
                : 'items-start p-6 pt-[100px]'
              : 'items-end'
          }`}
          onMouseDown={(event) => {
            if (maskClosable && event.target === event.currentTarget) onCancel?.();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={panelTransition}
            onAnimationComplete={(definition) => {
              if (definition === 'visible') afterOpenChange?.(true);
            }}
            drag={!isDesktop && !shouldReduceMotion ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{
              width: isDesktop ? panelWidth : undefined,
              ...styles?.content,
              ...style,
            }}
            className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden bg-bg-secondary outline-none ${
              isDesktop
                ? 'max-h-[calc(100dvh-64px)] rounded-xl border border-border-primary/80 shadow-[0_24px_80px_rgba(0,0,0,0.6)]'
                : 'rounded-t-2xl border-x border-t border-border-primary/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-24px_80px_rgba(0,0,0,0.6)]'
            } ${className ?? ''}`}
          >
            {!isDesktop && (
              <div
                className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/20"
                aria-hidden="true"
              />
            )}

            <header
              className="flex items-start justify-between gap-4 px-6 pt-4 sm:pt-5"
              style={styles?.header}
            >
              <div className="min-w-0">
                {title && (
                  <h2 id={titleId} className="text-base font-semibold leading-snug text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{description}</p>
                )}
              </div>
              {closable && (
                <button
                  type="button"
                  onClick={onCancel}
                  aria-label="Close dialog"
                  className="-mr-1.5 -mt-1 shrink-0 rounded-md p-1.5 text-text-muted transition-colors duration-150 hover:text-white"
                >
                  {closeIcon ?? <X className="h-4 w-4" aria-hidden="true" />}
                </button>
              )}
            </header>

            {hasBody && (
              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-4 pt-3"
                style={styles?.body}
              >
                {loading ? <ModalBodySkeleton /> : children}
              </div>
            )}

            {footer === undefined ? (
              <DefaultFooter
                okText={okText}
                cancelText={cancelText}
                okDanger={okDanger}
                confirmLoading={confirmLoading}
                okDisabled={okDisabled}
                onOk={onOk}
                onCancel={onCancel}
                okButtonProps={okButtonProps}
                cancelButtonProps={cancelButtonProps}
              />
            ) : footer !== null ? (
              <div className="px-6 pb-5" style={styles?.footer}>
                {footer}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
