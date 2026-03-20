import { useState, useEffect } from 'react';

type EditProfileModalProps = {
  user: any;
  handleSave: (name: string, currentPassword: string, newPassword: string) => void;
  onClose: () => void;
};

const EditProfileModal = ({ user, handleSave, onClose}: EditProfileModalProps) => {
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
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
            onClick={() => { handleSave(name, currentPassword, newPassword) }}
            className='w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 cursor-pointer'
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;