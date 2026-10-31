'use client';

import { useState, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export const inputClasses =
  'w-full rounded-md border border-border-primary bg-bg-primary px-3.5 py-2.5 text-sm text-white placeholder-text-muted transition-[border-color] duration-150 focus:border-accent focus:outline-none';

export const labelClasses = 'block text-[11px] font-medium text-text-secondary';

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className={labelClasses}>{label}</label>
      {children}
      {hint && <p className="font-mono text-[10px] text-text-muted">{hint}</p>}
    </div>
  );
}

export function ErrorBox({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-400">
      // {message}
    </div>
  );
}

export function SubmitButton({ pending, children = 'Save' }: { pending: boolean; children?: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97 disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Saving...
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Cloudinary-backed image field: previews the current image, uploads a
 * replacement through the save action, and supports explicit removal.
 * The crop happens on delivery via Cloudinary eager variants.
 */
export function ImageField({
  currentImage,
  currentImagePublicId,
}: {
  currentImage?: string;
  currentImagePublicId?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);

  return (
    <div className="space-y-2">
      <label className={labelClasses}>Cover image</label>
      <div className="flex flex-wrap items-start gap-4">
        {(currentImage && !remove) || preview ? (
          <div className="relative h-24 w-40 overflow-hidden rounded-lg border border-border-primary/60">
            <Image
              src={preview ?? currentImage ?? ''}
              alt="Cover preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-border-primary/60 font-mono text-[10px] text-text-muted">
            No image
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
              if (file) setRemove(false);
            }}
            className="block w-full cursor-pointer rounded-md border border-border-primary bg-bg-primary px-3 py-2 font-mono text-xs text-text-secondary file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black"
          />
          <p className="font-mono text-[10px] text-text-muted">
            JPG/PNG/WebP up to 4.5 MB — auto-cropped to 1200×630 and 800×800 on delivery
          </p>
          {currentImage && (
            <label className="flex w-fit items-center gap-2 font-mono text-[10px] text-text-secondary">
              <input
                type="checkbox"
                name="removeImage"
                checked={remove}
                onChange={(event) => {
                  setRemove(event.target.checked);
                  if (event.target.checked) {
                    const input = event.target.closest('div')?.parentElement?.querySelector('input[type="file"]') as HTMLInputElement | null;
                    if (input) input.value = '';
                    setPreview(null);
                  }
                }}
                className="h-3.5 w-3.5 accent-emerald-500"
              />
              Remove current image
            </label>
          )}
        </div>
      </div>
      {currentImage && <input type="hidden" name="currentImage" value={currentImage} />}
      {currentImagePublicId && <input type="hidden" name="currentImagePublicId" value={currentImagePublicId} />}
    </div>
  );
}
