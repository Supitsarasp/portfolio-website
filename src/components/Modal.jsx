import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children }) {
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const el = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    if (!el.open) el.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);
  return <dialog ref={dialog} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }} className="m-auto w-[calc(100%-2rem)] max-w-5xl max-h-[90dvh] p-0 rounded-2xl border border-border-light bg-white text-text-primary shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm">
    <div>
      <div className="sticky top-0 z-10 flex items-start justify-between gap-5 p-5 md:p-7 border-b border-border-light bg-white">
        <h2 id={titleId} className="text-xl md:text-2xl font-bold">{title}</h2>
        <button type="button" autoFocus onClick={onClose} aria-label="ปิดหน้าต่าง" className="p-2 rounded-full bg-base-bg shrink-0"><X size={24} /></button>
      </div>
      {children}
    </div>
  </dialog>;
}
