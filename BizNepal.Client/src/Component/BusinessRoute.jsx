import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";
import "../Customcss/businessDashboard.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    {
      path: "/business",
      icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      text: "Dashboard",
      active: true,
    },
    {
      path: "/business/profile",
      icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
      text: "Profile",
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
    {
      path: "/business/settings",
      icon: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z",
      text: "Settings",
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
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link ${item.active ? "active" : ""}`}
            >
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
      <div className="main-content ">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default BusinessRoute;
