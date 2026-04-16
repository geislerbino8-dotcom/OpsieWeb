import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMoon, HiSun } from 'react-icons/hi'; // Recommended: npm install react-icons
import UserMenu from './UserMenu';
import useTheme from '../common/useTheme';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = useTheme()
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Effect to apply the class to the <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  console.log(isDark)

  const showBackButton = location.pathname === '/admin/users' || location.pathname === '/admin/tickets';

  return (
    <header className='w-full flex items-center justify-between px-6 py-3 border-b bg-[#24b6dd] dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300 z-10'>
      <div className='flex items-center gap-4'>
        {showBackButton && (
          <button
            onClick={() => navigate('/admin')}
            className='px-3 py-1 rounded-md bg-white/20 text-white text-sm font-medium hover:bg-white/30 backdrop-blur-sm transition cursor-pointer'
          >
            ← Dashboard
          </button>
        )}

        {location.pathname === '/admin' && 
          <img src='src/assets/opsie/opsie_logo.jpg' alt='Logo' className='h-10 rounded shadow-sm' draggable='false' />
        } 
      </div>

      <div className='flex items-center gap-4 z-1'>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200'
          aria-label='Toggle Dark Mode'
        >
          {isDarkMode ? (
            <HiSun className='w-5 h-5 text-yellow-300' />
          ) : (
            <HiMoon className='w-5 h-5 text-blue-100' />
          )}
        </button>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header; 