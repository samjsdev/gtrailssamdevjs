'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Native top-layer dialog supplies focus containment, Escape and focus return. */
export default function Modal({ children, onClose, label, wide = false }: {
  children: ReactNode; onClose: () => void; label: string; wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={ref} aria-label={label} data-lenis-prevent
      className={`mpa-dialog ${wide ? 'mpa-dialog-wide' : ''}`}
      onCancel={(event) => { event.preventDefault(); close.current(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close.current();
      }}>
      {children}
    </dialog>, document.body,
  );
}
