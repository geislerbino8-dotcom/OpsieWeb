import { useState } from 'react';
import { updateUser } from '../../../api/updateUser';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';

import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

const UpdateUserModal = ({ user, onClose, onUpdated }: any) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  const handleSave = async () => {
    try {
      const ok = await confirm({
        title: 'Update User',
        message: 'Are you sure you want to update this user?',
        confirmText: 'UPDATE'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await updateUser(user._id, { name, role });
    
      addToast(data.message, 'success');
      onUpdated();
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
            Update User
          </h2>

          <div className='space-y-3'>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
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
              onClick={handleSave}
              className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer'
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </>
    
  );
};

export default UpdateUserModal;