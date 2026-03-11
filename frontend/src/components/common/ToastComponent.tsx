import type { Toast } from '../../hooks/useToast';

type Props = {
  toasts: Toast[];
};

const ToastContainer = ({ toasts }: Props) => {
  return (
    <div className='fixed top-6 right-6 z-200 flex flex-col gap-3'>

      {toasts.map((toast) => {

        const color =
          toast.type === 'success'
            ? 'bg-green-600'
            : toast.type === 'error'
            ? 'bg-red-600'
            : 'bg-blue-600';

        return (
          <div
            key={toast.id}
            className={`text-white px-4 py-3 rounded-lg shadow-lg text-sm ${color} animate-slideIn`}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;