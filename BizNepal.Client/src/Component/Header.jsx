import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";
import { Logout } from "../slices/authSlices";
import "../Customcss/header.css";
import Searchbox from "./Searchbox";
import ResponsiveSidebar from "./ResponsiveSidebarprofile";

import { useGetBookmarkedQuery } from "../slices/userApiSlices";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [cartStatus, setCartStatus] = useState(false);

  const { data: bookmarkedData } = useGetBookmarkedQuery(); // Fetching bookmarked data

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow-sm sticky-navbar"
      id="top"
    >
      <Container fluid className="align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src="/images/biznepallogo.png" style={{ width: "150px" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center navbar-menu-section">
            <Nav.Link as={Link} to="/" className="px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-3">
              Why biznepal?
            </Nav.Link>

            <div className="searchbox-wrapper d-flex align-items-center">
              <Searchbox />
            </div>
          </Nav>

          <Nav className="align-items-center navbar-button-section">
            {userInfo ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/bookmark"
                  className={`position-relative mx-3  `}
                >
                  <BsBookmarkFill
                    size={20}
                    className={`${cartStatus ? "text-secondary" : "text-dark"}`}
                  />

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    style={{
                      fontSize: "0.65rem",
                      marginTop: "7px",
                      marginLeft: "-5px",
                      minWidth: "16px",
                      height: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                    }}
                  >
                    {bookmarkedData?.length > 0 ? bookmarkedData.length : 0}
                  </span>
                </Nav.Link>
                <Nav.Link as={Link} to="/businesslist">
                  <button
                    variant="danger"
                    className="btn-business mx-2 nav-btn"
                  >
                    + List Your Business
                  </button>
                </Nav.Link>
                {userInfo &&
                  (userInfo.role === "Admin" ||
                    userInfo.role === "SuperAdmin") && (
                    <Nav.Link as={Link} to="/admin" target="_blank">
                      <button className="nav-btn btn-admin">
                        <RiAdminFill className="admin-icon" />
                        Admin
                      </button>
                    </Nav.Link>
                  )}
                {userInfo.role === "BusinessOwner" && (
                  <button
                    variant="danger"
                    className="btn-business-dashboard mx-2 nav-btn"
                  >
                    <a href="/business" target="_blank" className="text-white text-decoration-none">
                      <MdSpaceDashboard
                        className="admin-icon"
                        style={{ marginRight: "8px" }}
                      />
                      Dashboard
                    </a>
                  </button>
                )}
                <ResponsiveSidebar />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <button className="mx-2 btn-login nav-btn">Login</button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <button className="mx-2 btn-register nav-btn">Sign Up</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
