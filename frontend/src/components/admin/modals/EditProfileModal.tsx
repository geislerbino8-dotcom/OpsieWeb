import { useState, useEffect } from 'react';
import { updateProfile } from '../../../api/updateProfile.ts';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';

import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

type EditProfileModalProps = {
  user: any;
  onClose: () => void;
  onUpdated: () => void;
};

const EditProfileModal = ({ user, onClose, onUpdated }: EditProfileModalProps) => {
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSave = async () => {
    try {
      const ok = await confirm({
        title: 'Update Your Profile',
        message: 'Are you sure you want to update your information?',
        confirmText: 'UPDATE'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await updateProfile({ name, currentPassword, newPassword });

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
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-lg max-w-75 w-full p-6 space-y-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold text-gray-800'>Edit Profile</h2>
            <button onClick={onClose} className='text-gray-500 text-xl cursor-pointer'>✕</button>
          </div>

          <p className='text-gray-500 text-sm'>Edit name or password, or both.</p>

          <div className='flex flex-col gap-3'>
            <div>
              <label className='text-xs text-gray-500'>Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className='border border-gray-500 rounded-md w-full px-3 py-2 text-sm focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
              />
            </div>

            <div>
              <label className='text-xs text-gray-500'>Current Password</label>
              <input
                type='password'
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className='border border-gray-500 rounded-md w-full px-3 py-2 text-sm focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
              />
            </div>

            <div>
              <label className='text-xs text-gray-500'>New Password</label>
              <input
                type='password'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className='border border-gray-500 rounded-md w-full px-3 py-2 text-sm focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className='w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 cursor-pointer'
          >
            Save Changes
          </button>
        </div>
      </div>

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </>
  );
};

export default EditProfileModal;