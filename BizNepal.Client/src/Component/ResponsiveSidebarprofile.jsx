import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import TokenDecode from "./TokenDecode";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../slices/authSlices";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useGetUserByIdQuery } from "../slices/userApiSlices";

import {
  FaUsers,
  FaSignOutAlt,
  FaQuestionCircle,
  FaUserCircle,
} from "react-icons/fa";

const ResponsiveSidebarProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing

  const { userInfo } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

  const Id = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : "Guest";

  const { data: userData } = useGetUserByIdQuery(Id);
  console.log("userData", userData);
  return (
    <div>
      {/* Open Sidebar Button (Avatar Image) */}
      <Button variant="link" onClick={toggleSidebar} className="p-0">
        <FaUserCircle className="fs-2 text-dark" />
      </Button>

      {/* Sidebar */}
      <Offcanvas
        show={isSidebarOpen}
        onHide={toggleSidebar}
        placement="end" // Slides in from the right
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          width: "fit-content", // Fit content width
          padding: "10px", // 10px padding
        }} // Black background with white text
      >
        <Offcanvas.Header closeButton closeVariant="white"></Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled m-0 p-0">
            <span className="fs-2">{userData?.userName}</span>
            <li className="my-2">
              <Link
                to="/profile"
                className="text-white text-decoration-none d-flex align-items-center"
              >
                <span className="mx-2 fs-4">
                  <FaUsers className="icon" />
                </span>{" "}
                <span className="fs-5">Profile</span>
              </Link>
            </li>
            {/* <li className="my-2">
              <Link
                to="/settings"
                className="text-white text-decoration-none d-flex align-items-center"
              >
                <span className="mx-2 fs-4">
                  <FaCog className="icon" />
                </span>{" "}
                <span className="fs-5">Settings</span>
              </Link>
            </li> */}
            <li className="my-2">
              <Link
                to="/help"
                className="text-white text-decoration-none d-flex align-items-center"
              >
                <span className="mx-2 fs-4">
                  <FaQuestionCircle className="icon" />
                </span>{" "}
                <span className="fs-5">Help</span>
              </Link>
            </li>
            <li
              className="my-2 d-flex align-items-center"
              onClick={logoutHandler}
              style={{ cursor: "pointer" }}
            >
              <span className="mx-2 fs-4">
                <FaSignOutAlt className="icon" />
              </span>{" "}
              <span className="fs-5">Logout</span>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ResponsiveSidebarProfile;
