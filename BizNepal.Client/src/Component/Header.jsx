import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";
import { Logout } from "../slices/authSlices";
import "../Customcss/header.css";
import Searchbox from "./Searchbox";
import ResponsiveSidebar from "./ResponsiveSidebarprofile";

const Header = ({ toggleTheme, currentTheme }) => {
  const themeIcon = currentTheme === "light" ? "🌙" : "🌞";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [cartStatus, setCartStatus] = useState(false);

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

  // Memoize the bookmark count calculation to avoid unnecessary re-renders
  const bookmarkCount = useMemo(() => {
    const bookmarkedItems = localStorage.getItem("bookmark");
    if (bookmarkedItems) {
      return bookmarkedItems.split(",").length;
    }
    setCartStatus(true);
    return 0;
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" id="top">
      <Container fluid className="align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src="/images/biznepallogo.png" style={{ width: "150px" }} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="toggle-btn"
        />
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

            <div className="d-flex align-items-center text-end">
              <Nav.Link as={Link} to="/bookmark" className="px-3">
                <span
                  className={` ${
                    cartStatus ? "text-secondary" : "text-dark"
                  } fas fa-bookmark`}
                />
                {bookmarkCount > 0 && (
                  <span className="text-primary mx-2">
                    {bookmarkCount} item
                  </span>
                )}
              </Nav.Link>
            </div>
          </Nav>

          <Nav className="align-items-center navbar-button-section">
            {userInfo ? (
              <>
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
                    <a href="/business" target="_blank" className="text-white">
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
