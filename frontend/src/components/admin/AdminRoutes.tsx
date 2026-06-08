import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Header from "../admin/header/Header";
import LoginPage from "../admin/pages/LoginPage";

const AdminRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminRoutes;