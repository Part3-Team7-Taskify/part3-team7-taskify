'use client';

import { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-xl p-6 w-96 relative'>
        <button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-black'>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
