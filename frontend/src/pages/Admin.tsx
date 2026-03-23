import { AuthProvider } from '../hooks/useAuth';
import { ConfirmProvider } from '../components/admin/context/ConfirmContext';
import AdminRoutes from '../components/admin/AdminRoutes'

const Admin = () => {
  return(
    <AuthProvider>
      <ConfirmProvider>
        <AdminRoutes />
      </ConfirmProvider>
    </AuthProvider>
  )
}

export default Admin;