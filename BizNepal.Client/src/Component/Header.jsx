import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  // console.log("userInfo", userInfo.role);

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

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

            {/* Integrated SearchWithSuggestions Component */}
            <div className="searchbox-wrapper d-flex align-items-center">
              <Searchbox />
            </div>
          </Nav>

          <Nav className="align-items-center navbar-button-section">
            {userInfo &&
              (userInfo.role === "Admin" || userInfo.role === "SuperAdmin") && (
                <Button
                  className="mx-2 nav-btn btn-admin"
                  target="_blank"
                  href="/admin"
                >
                  Admin
                </Button>
              )}

            {userInfo ? (
              <>
                <Nav.Link as={Link} to="/businesslist">
                  <Button
                    variant="danger"
                    className="btn-business mx-2 nav-btn "
                  >
                    + List Your Business
                  </Button>
                </Nav.Link>

                {userInfo.role === "BusinessOwner" && (
                  <>
                    <Nav.Link as={Link} to="/business">
                      <Button
                        variant="danger"
                        className="btn-business-dashboard mx-2 nav-btn"
                      >
                        Dashboard
                      </Button>
                    </Nav.Link>
                  </>
                )}
                <ResponsiveSidebar />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button
                    variant="outline-primary"
                    className="mx-2 btn-login nav-btn"
                  >
                    Login
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button
                    variant="outline-primary"
                    className="mx-2 btn-register nav-btn "
                  >
                    Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}

            {/* <Button
              variant="outline-secondary"
              className="btn-theme mx-2 "
              onClick={toggleTheme}
            >
              {themeIcon}
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
