import { Routes, Route } from 'react-router-dom';
import { getToken } from '../utils/authToken';
import { ConfirmProvider } from '../components/admin/context/ConfirmContext';

import LoginPage from '../components/admin/pages/LoginPage';
import DashboardPage from '../components/admin/pages/DashboardPage';
import Header from '../components/admin/header/Header';
import UserManagementPage from '../components/admin/pages/UserManagementPage';
import TicketingSupportSystemPage from '../components/admin/pages/TicketingSupportSystemPage';

const token = getToken();

let routes;

if (token) {
  routes = (
    <>
      <Header />
      <Routes>
        <Route index element={<DashboardPage />} />
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

const Admin = () => {
  return(
      <ConfirmProvider>
        {routes}
      </ConfirmProvider>
  )
}

export default Admin;