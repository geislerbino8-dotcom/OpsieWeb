import { createContext, useContext } from 'react';

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

export type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

/**
 * Confirmation-dialog context.
 *
 * Split out of `ConfirmContext.tsx` so that module only exports the
 * `ConfirmProvider` component (react-refresh / Fast Refresh).
 */
export const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error('useConfirm must be used inside ConfirmProvider');
  }

  return context;
};
