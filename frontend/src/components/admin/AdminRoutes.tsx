import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import LoginPage from '../admin/pages/LoginPage';
import DashboardPage from '../admin/pages/DashboardPage';
import Header from '../admin/header/Header';
import UserManagementPage from '../admin/pages/UserManagementPage';
import TicketingSupportSystemPage from '../admin/pages/TicketingSupportSystemPage';

const Admin = () => {
  const { token } = useAuth();

  let routes;

  if (token) {
    routes = (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/users' element={<UserManagementPage />} />
          <Route path='/tickets' element={<TicketingSupportSystemPage />} />
          <Route path='*' element={<DashboardPage />} />
        </Routes>
      </>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
    )
  }

  return routes
}

export default Admin;