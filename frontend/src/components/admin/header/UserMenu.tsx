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
      });

      if (!ok) return;

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
  };

  const logout = async () => {
    try {
      const ok = await confirm({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        confirmText: 'LOGOUT'
      });

      if (!ok) return;

      logoutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className='relative z-50' ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer transition-colors duration-200'
      >
        <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm'>
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className='hidden md:flex flex-col items-start'>
          <span className='text-sm font-semibold text-slate-800 dark:text-slate-100 leading-none'>{user.name}</span>
          <span className='text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-1'>{user.role}</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden transform transition-all duration-200 origin-top-right ${
          dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className='p-3 border-b border-slate-100 dark:border-slate-800'>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Account</p>
        </div>

        <button
          onClick={() => { setShowProfileModal(true); setDropdownOpen(false); }}
          className='w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors flex items-center gap-2'
        >
          Show Profile
        </button>

        <button
          onClick={() => { setShowEditProfileModal(true); setDropdownOpen(false); }}
          className='w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors flex items-center gap-2'
        >
          Edit Profile
        </button>

        <div className='h-px bg-slate-100 dark:bg-slate-800 mx-2 my-1' />

        <button
          onClick={logout}
          className='w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors flex items-center gap-2'
        >
          Logout
        </button>
      </div>

      {/* Modals & Overlays */}
      {showProfileModal && <ShowProfileModal user={user} onClose={() => setShowProfileModal(false)} />}
      {showEditProfileModal && <EditProfileModal user={user} handleSave={handleSave} onClose={() => setShowEditProfileModal(false)} />}

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default UserMenu;