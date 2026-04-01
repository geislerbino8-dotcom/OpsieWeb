import { useEffect, useState } from 'react';
import { createUser } from '../../../api/createUser';
import { getAllUsers } from '../../../api/getAllUsers';
import { updateUser } from '../../../api/updateUser';
import { resetPassword } from '../../../api/resetPassword';
import { restoreUser } from '../../../api/restoreUser';
import { deleteUser } from '../../../api/deleteUser';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';


import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

import CreateUserModal from '../modals/CreateUserModal';
import UpdateUserModal from '../modals/UpdateUserModal';

type User = {
  _id: string;
  name: string;
  username: string;
  role: string;
  isActive: boolean;
  tickets: number;
  createdAt: string;
};

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  const fetchUsers = async () => {
    try {
      apiState.startLoading();

      const data = await getAllUsers();

      setUsers(data.users);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch users', 'error');
    } finally {
      apiState.reset();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (name: string, username: string, role: string) => {
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
      fetchUsers()
      setCreateOpen(false)
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  }

  const handleUpdate = async (id: string, name:string, role: string ) => {
    try {
      const ok = await confirm({
        title: 'Update User',
        message: 'Are you sure you want to update this user?',
        confirmText: 'UPDATE'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await updateUser(id, { name, role });
    
      addToast(data.message, 'success');
      fetchUsers();
      setUpdatedUser(null);
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  }

  const handleReset = async (id: string) => {
    try {
      const ok = await confirm({
        title: 'Reset User Password',
        message: `Are you sure you want to reset this user's password?`,
        confirmText: 'RESET'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await resetPassword(id);
    
      addToast(data.message, 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      fetchUsers();
      apiState.reset();
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const ok = await confirm({
        title: 'Restore User',
        message: 'Are you sure you want to reactivate this user?',
        confirmText: 'RESTORE'
      })

      if(!ok) return
      
      apiState.startLoading();
      const data = await restoreUser(id);
    
      addToast(data.message, 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      fetchUsers();
      apiState.reset();
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const ok = await confirm({
        title: 'Delete User',
        message: 'Are you sure you want to deactivate this user?',
        confirmText: 'DELETE'
      })

      if(!ok) return

      apiState.startLoading();
      const data = await deleteUser(id);
    
      addToast(data.message, 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      fetchUsers();
      apiState.reset();
    }
  }

  return (
    <div className='p-6'>
      <div className='max-w-225 mx-auto flex justify-between items-center mb-6'>
        <h1 className='text-xl font-semibold'>
          User Management
        </h1>

        <button
          onClick={() => setCreateOpen(true)}
          className='px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer'
        >
          Create User
        </button>
      </div>

      <div className='max-w-225.5 mx-auto bg-white border rounded-lg overflow-x-auto'>
        <table className='min-w-225 text-sm'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3'>Username</th>
              <th className='px-4 py-3'>Role</th>
              <th className='px-4 py-3'>Tickets</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Created</th>
              <th className='px-4 py-3'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className='border-t hover:bg-gray-200'>
                <td className='px-4 py-3'>{user.name}</td>

                <td className='px-4 py-3'>@{user.username}</td>

                <td className='px-4 py-3 capitalize'>
                  {user.role}
                </td>

                <td className='px-4 py-3 text-center'>
                  {user.tickets}
                </td>

                <td className='px-4 py-3'>
                  {user.isActive ? (
                    <span className='text-green-600'>Active</span>
                  ) : (
                    <span className='text-red-600'>Deleted</span>
                  )}
                </td>

                <td className='px-4 py-3 text-gray-600'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 flex gap-3 flex-wrap'>
                  <button
                    onClick={() => setUpdatedUser(user)}
                    className='text-blue-600 hover:underline cursor-pointer'
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleReset(user._id)}
                    className='text-yellow-600 hover:underline cursor-pointer'
                  >
                    Reset
                  </button>

                  {user.isActive && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className='text-red-600 hover:underline cursor-pointer'
                    >
                      Delete
                    </button>
                  )}

                  {!user.isActive && (
                    <button
                      onClick={() => handleRestore(user._id)}
                      className='text-green-600 hover:underline cursor-pointer'
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <CreateUserModal
          handleCreate={handleCreate}
          onClose={() => setCreateOpen(false)}
          onCreated={fetchUsers}
        />
      )}

      {updatedUser && (
        <UpdateUserModal
          handleSave={handleUpdate}
          user={updatedUser}
          onClose={() => setUpdatedUser(null)}
        />
      )}

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default UserManagementPage;