import { useState } from 'react';

const UpdateUserModal = ({ user, handleSave, onClose }: any) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

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
              onClick={() => {handleSave(user._id, name, role)}}
              className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default UpdateUserModal;