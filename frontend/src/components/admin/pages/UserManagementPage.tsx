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

  // API Action Handlers (kept your logic, added consistent toast handling)
  const handleCreate = async (name: string, username: string, role: string) => {
    const ok = await confirm({
      title: 'Create User',
      message: 'Are you sure you want to create this user account?',
      confirmText: 'CREATE'
    });
    if (!ok) return;

    try {
      apiState.startLoading();
      const data = await createUser({ name, username, role });
      addToast(data.message, 'success');
      fetchUsers();
      setCreateOpen(false);
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  };

  const handleUpdate = async (id: string, name: string, role: string) => {
    const ok = await confirm({
      title: 'Update User',
      message: 'Apply changes to this user account?',
      confirmText: 'UPDATE'
    });
    if (!ok) return;

    try {
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
  };

  const handleAction = async (id: string, action: 'reset' | 'restore' | 'delete') => {
    const configs = {
      reset: { title: 'Reset Password', msg: 'Reset user to default password?', btn: 'RESET', fn: resetPassword },
      restore: { title: 'Restore User', msg: 'Reactivate this user account?', btn: 'RESTORE', fn: restoreUser },
      delete: { title: 'Deactivate User', msg: 'This will restrict user access.', btn: 'DELETE', fn: deleteUser },
    };
    
    const config = configs[action];
    const ok = await confirm({ title: config.title, message: config.msg, confirmText: config.btn });
    if (!ok) return;

    try {
      apiState.startLoading();
      const data = await config.fn(id);
      addToast(data.message, 'success');
      fetchUsers();
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  };

  return (
    <div className='min-h-screen bg-gray-50/50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>User Management</h1>
          <p className='text-gray-500 mt-1'>Manage system access, roles, and account security.</p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className='flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-indigo-200 active:scale-95'
        >
          <span>Create New User</span>
        </button>
      </div>

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
          <p className='text-sm text-gray-500 font-medium'>Total Users</p>
          <p className='text-2xl font-bold text-gray-900'>{users.length}</p>
        </div>
        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
          <p className='text-sm text-gray-500 font-medium'>Active Accounts</p>
          <p className='text-2xl font-bold text-green-600'>{users.filter(u => u.isActive).length}</p>
        </div>
        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
          <p className='text-sm text-gray-500 font-medium'>Inactive</p>
          <p className='text-2xl font-bold text-red-500'>{users.filter(u => !u.isActive).length}</p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-gray-50/50 border-b border-gray-200 text-gray-600 font-semibold text-xs uppercase tracking-wider'>
                <th className='px-6 py-4'>User Details</th>
                <th className='px-6 py-4'>Role</th>
                <th className='px-6 py-4 text-center'>Tickets</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4'>Joined</th>
                <th className='px-6 py-4 text-right'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {users?.map((user) => (
                <tr key={user._id} className='group hover:bg-indigo-50/30 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-gray-900'>{user.name}</span>
                      <span className='text-xs text-gray-400'>@{user.username}</span>
                    </div>
                  </td>

                  <td className='px-6 py-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize border border-gray-200'>
                      {user.role}
                    </span>
                  </td>

                  <td className='px-6 py-4 text-center'>
                    <span className='text-sm font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded'>
                      {user.tickets}
                    </span>
                  </td>

                  <td className='px-6 py-4'>
                    {user.isActive ? (
                      <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-500'></span>
                        Active
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded-md border border-red-100'>
                        <span className='w-1.5 h-1.5 rounded-full bg-red-500'></span>
                        Deactivated
                      </span>
                    )}
                  </td>

                  <td className='px-6 py-4 text-sm text-gray-500'>
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className='px-6 py-4'>
                    <div className='flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity'>
                      <button
                        onClick={() => setUpdatedUser(user)}
                        className='p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors'
                        title="Edit User"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleAction(user._id, 'reset')}
                        className='p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors'
                        title="Reset Password"
                      >
                        Reset
                      </button>
                      {user.isActive ? (
                        <button
                          onClick={() => handleAction(user._id, 'delete')}
                          className='p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors'
                          title="Deactivate"
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user._id, 'restore')}
                          className='p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors'
                          title="Restore Account"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && !apiState.status && (
            <div className="py-20 text-center text-gray-400">
              No users found.
            </div>
          )}
        </div>
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