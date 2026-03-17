import { useEffect } from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
      <div
        className='
        w-full max-w-sm
        bg-white
        rounded-lg
        shadow-lg
        p-6
        transform transition-all duration-200
      '
      >
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
          {title}
        </h2>

        <p className='text-sm text-gray-600 mb-6'>
          {message}
        </p>

        <div className='flex justify-end gap-3 flex-wrap'>
          <button
            onClick={onCancel}
            className='
            px-4 py-2
            text-sm
            border
            rounded-md
            hover:bg-gray-100
            transition
            cursor-pointer
          '
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className='
            px-5 py-2
            text-sm
            bg-gray-200
            text-black
            border
            rounded-md
            hover:bg-gray-400 
            hover:text-white
            cursor-pointer
          '
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;