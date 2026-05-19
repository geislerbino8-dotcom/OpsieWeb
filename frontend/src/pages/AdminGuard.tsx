import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';


interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { token } = useAuth();

  // 1. If the user isn't logged in, redirect them out immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If they are logged in, show the shared Header layout + the active page
  return (
    <>
      <Header />
      <main className="admin-main-content">
        {children}
      </main>
    </>
  );
};

export default AdminGuard;