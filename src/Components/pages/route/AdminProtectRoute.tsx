import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { roleName } from "../auth/authUser";
interface Props {
  children?: any;
  redirect?: string;
}
const AdminProtectRoute = ({ children, redirect = "/dashboard" }: Props) => {
  if (!roleName()) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default AdminProtectRoute;
