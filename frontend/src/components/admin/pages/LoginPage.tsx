import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/login';
import { useAuth } from '../../../hooks/useAuth';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';

import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

import OpsieLogo from '../../../assets/opsie/opsie_full.jpg'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      apiState.startLoading();

      const data = await login(username, password);

      loginUser(data.token);

      addToast(data.message, 'success');
      window.location.href = '/admin';
      navigate('/');
    } catch (error: any) {
      addToast(error.response?.data?.message, 'error');
    }
    apiState.reset();
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 flex'>
        <div className='w-1/2 bg-[#3cbde6]'></div>
        <div className='w-1/2 bg-[#f0f7fa]'></div>
      </div>

      <div className='absolute top-6 left-6 flex items-center gap-2 z-10'>
        <img src={OpsieLogo} className='h-25'/>
      </div>

      <div className='relative z-10 w-full max-w-sm px-6'>
        <div className='bg-white rounded-lg shadow-xl p-6 sm:p-8'>
          <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-6'>
            Sign in
          </h2>

          <form onSubmit={handleLogin} className='space-y-4'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
            />

            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#3cbde6] focus:outline-none'
            />

            <button
              type='submit'
              className='w-full bg-[#3cbde6] hover:bg-blue-500 text-white py-2 rounded-md text-sm font-medium transition cursor-pointer'
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {apiState.status === 'loading' && <LoadingOverlay />}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default LoginPage;