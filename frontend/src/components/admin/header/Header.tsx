import { useLocation, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname === '/users' || location.pathname === '/tickets';

  return (
    <div className='w-full flex items-center justify-between px-6 py-3 border-b bg-[#24b6dd] z-10'>
      <div className='flex items-center gap-4'>
        {showBackButton && (
          <button
            onClick={() => navigate('/')}
            className='px-3 py-1 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 transition cursor-pointer'
          >
            ← Dashboard
          </button>
        )}

        {location.pathname === '/' && 
          <img src='src/assets/opsie/opsie_logo.jpg' alt='Logo' className='h-10'/>
        } 
      </div>

      <div className='flex items-center z-1'>
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;