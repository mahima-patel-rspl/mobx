import React, { Fragment } from "react";
import { getToken } from "./authUser";
import { Navigate } from "react-router-dom";
import SecureLS from "secure-ls";
function logOut() {
  const ls = new SecureLS();
  const rememberMe: any = ls.get("rememberMe")?.data;
  if (rememberMe) {
    ls?.remove("token");
    ls?.remove("role");
    ls?.remove("username");
    ls?.remove("userImg");
    ls?.remove("isNewUser");
  } else {
    ls.removeAll();
  }

  if (!getToken()) {
    return <Navigate to={"/"} />;
  }
  return <Fragment></Fragment>;
}

export default logOut;
