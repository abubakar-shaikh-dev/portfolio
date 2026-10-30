'use client';

import { useState, useTransition, type ReactNode } from 'react';
import { Modal } from '@/components/ui/modal';

interface ConfirmSubmitProps {
  /** Server action that deletes the row (reads `id` from FormData). */
  action: (formData: FormData) => Promise<void>;
  id: string;
  title: ReactNode;
  description?: ReactNode;
  okText?: ReactNode;
  cancelText?: ReactNode;
  /** Trigger button content. */
  children: ReactNode;
  triggerClassName?: string;
  triggerAriaLabel?: string;
}

/**
 * Destructive row action: renders a button that opens a confirm modal and
 * only runs the server action when the user confirms. The modal stays open
 * with a busy OK button until the action settles.
 */
export function ConfirmSubmit({
  action,
  id,
  title,
  description,
  okText = 'Delete',
  cancelText,
  children,
  triggerClassName,
  triggerAriaLabel,
}: ConfirmSubmitProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOk = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set('id', id);
      await action(formData);
      setOpen(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
        aria-label={triggerAriaLabel}
        aria-haspopup="dialog"
      >
        {children}
      </button>
      <Modal
        open={open}
        title={title}
        description={description}
        okText={okText}
        cancelText={cancelText}
        okDanger
        confirmLoading={isPending}
        onOk={handleOk}
        onCancel={() => {
          if (!isPending) setOpen(false);
        }}
        maskClosable={!isPending}
        keyboard={!isPending}
      />
    </>
  );
}
