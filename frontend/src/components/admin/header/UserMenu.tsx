import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../api/getMe';
import { updateProfile } from '../../../api/updateProfile.ts';
import { useAuth } from '../../../hooks/useAuth';
import ShowProfileModal from '../modals/ShowProfileModal';
import EditProfileModal from '../modals/EditProfileModal';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';

import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

type User = {
  _id: string;
  name: string;
  username: string;
  role: string;
  tickets: number;
  createdAt: string;
};

const UserMenu = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { logoutUser } = useAuth();

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  const handleSave = async (name: string, currentPassword: string, newPassword: string) => {
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
      fetchUser();
      setShowEditProfileModal(false);
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    } finally {
      apiState.reset();
    }
  }

  const logout = async () => {
    try {
      const ok = await confirm({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        confirmText: 'LOGOUT'
      })

      if(!ok) return

      logoutUser();
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  };

  if (!user) return null;

  return (
    <div className='z-0' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer'
      >
        <div className='w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold'>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className='text-sm font-medium text-gray-800'>{user.name}</span>
      </button>

      <div
        className={`absolute right-1 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transform transition-all duration-200 ${
          dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={() => { setShowProfileModal(true); setDropdownOpen(false); }}
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer'
        >
          Show Profile
        </button>

        <button
          onClick={() => { setShowEditProfileModal(true); setDropdownOpen(false); }}
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer'
        >
          Edit Profile
        </button>

        <button
          onClick={logout}
          className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-300 cursor-pointer'
        >
          Logout
        </button>
      </div>

      {showProfileModal && <ShowProfileModal user={user} onClose={() => setShowProfileModal(false)} />}
      {showEditProfileModal && <EditProfileModal user={user} handleSave={handleSave} onClose={() => setShowEditProfileModal(false)} />}

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default UserMenu;