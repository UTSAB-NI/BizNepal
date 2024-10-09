import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../slices/authSlices";
import "../Customcss/Sidenavbar.css";

import {
  FaClipboardList,
  FaUsers,
  FaAddressBook,
  FaSignOutAlt,
  FaGitter,
} from "react-icons/fa";

const Sidenavbar = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispath(Logout());
    navigate("/login");
  };
  return (
    <div className="sidenav">
      <ul>
        <li>
          <Link to="/admin">
            <h2>Dashboard</h2>
          </Link>
        </li>
        <li>
          <Link to="/admin/generaluser">General User</Link>
        </li>
        <li>
          <Link to="/admin/businessowner">Business Owner</Link>
        </li>
        <li>
          <Link to="/admin/business">Business</Link>
        </li>
        <li>
          <Link to="/admin/category">Category</Link>
        </li>
        <li>
          <Link to="/admin/alluser">All User</Link>
        </li>

        <li onClick={logoutHandler} style={{ cursor: "pointer" }}>
          <span className="mx-2 fs-3">
            <FaSignOutAlt className="icon" />
          </span> <span className="fs-4">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidenavbar;
