import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";
import "../Customcss/businessDashboard.css";

const Sidebar = () => {
  const navItems = [
    {
      path: "/business",
      icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      text: "Dashboard",
    },

    {
      path: "/business/alllisting",
      icon: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
      text: "Listings business",
    },
    {
      path: "/business/allreview",
      icon: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
      text: "Review",
    },
  ];

  return (
    <div className="d-flex">
      <div className="business-dashboard-sidebar">
        <div className="logo">
          <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="logo-text ms-2">Dashboard</span>
        </div>

        <div className="nav flex-column">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="sidebar-link">
              <svg
                className="sidebar-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={item.icon} />
              </svg>
              <span className="link-text">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const BusinessRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo?.role === "BusinessOwner" ? (
    <div className="dashboard-container  ">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="business-dashboard-main-content">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default BusinessRoute;
