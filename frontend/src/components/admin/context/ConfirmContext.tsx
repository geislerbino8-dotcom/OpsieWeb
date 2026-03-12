import { createContext, useContext, useState } from 'react'
import ConfirmationModal from '../modals/ConfirmationModal'

type ConfirmOptions = {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmContextType | null>(null)

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [resolver, setResolver] = useState<(value: boolean) => void>()

  const confirm: ConfirmContextType = (options) => {
    setOptions(options)

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve)
    })
  }

  const handleConfirm = () => {
    resolver?.(true)
    setOptions(null)
  }

  const handleCancel = () => {
    resolver?.(false)
    setOptions(null)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <ConfirmationModal
        isOpen={!!options}
        title={options?.title || ''}
        message={options?.message || ''}
        confirmText={options?.confirmText}
        cancelText={options?.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error('useConfirm must be used inside ConfirmProvider')
  }

  return context
}