import { useState } from 'react'
import ConfirmationModal from '../modals/ConfirmationModal'
import {
  ConfirmContext,
  type ConfirmContextType,
  type ConfirmOptions,
} from './useConfirm'

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