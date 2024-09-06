import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const AdimRoute = () => {
    
  const { userInfo } = useSelector((State) => State.auth);

  return userInfo && userInfo.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdimRoute;
