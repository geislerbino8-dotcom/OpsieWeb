import { useState } from 'react';
import { createUser } from '../../../api/createUser';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';

import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

const CreateUserModal = ({ onClose, onCreated }: any) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('support');

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  const handleCreate = async () => {
    try {
      const ok = await confirm({
        title: 'Create User',
        message: 'Are you sure you want to create this user account?',
        confirmText: 'CREATE'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await createUser({ name, username, role });
    
      addToast(data.message, 'success');
      onCreated();
      onClose();
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  }

  return (
    <>
      <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
        <div className='bg-white rounded-lg p-6 w-full max-w-md'>
          <h2 className='text-lg font-semibold mb-4'>
            Create User
          </h2>

          <div className='space-y-3'>
            <input
              placeholder='Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className='border w-full px-3 py-2 rounded focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
            />

            <input
              placeholder='Username'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className='border w-full px-3 py-2 rounded focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
            />

            <select
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className='border w-full px-3 py-2 rounded focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
            >
              <option value='manager'>Manager</option>
              <option value='developer'>Developer</option>
              <option value='support'>Support</option>
            </select>

          </div>

          <div className='flex justify-end gap-3 mt-6'>
            <button className='cursor-pointer' onClick={onClose}>
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer'
            >
              Create
            </button>
          </div>
        </div>
      </div>

        {apiState.status === 'loading' && <LoadingOverlay />}

        <ToastContainer toasts={toasts} />
    </>
    
  );
}

export default CreateUserModal;