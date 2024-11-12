import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Nav,
  Navbar,
  Container,
  Image,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Logout } from "../slices/authSlices";
import TokenDecode from "./TokenDecode";
import "../Customcss/header.css";
import Searchbox from "./Searchbox";

const Header = ({ toggleTheme, currentTheme }) => {
  const themeIcon = currentTheme === "light" ? "🌙" : "🌞";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

  const getTimeIcon = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "🌅";
    } else if (hours < 18) {
      return "🌞";
    } else {
      return "🌙";
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-3 shadow-sm">
      <Container fluid className="align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src="/images/biznepallogo.png" style={{ width: "150px" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle-btn" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-3">
              Home
            </Nav.Link>
            
            {/* Integrated SearchWithSuggestions Component */}
            <div className="searchbox-wrapper d-flex align-items-center">
              <Searchbox />
            </div>
          </Nav>

          <Nav className="align-items-center">
            {userInfo ? (
              <>
                <NavDropdown title={<TokenDecode />} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logouthandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/businesslist">
                  <Button variant="primary" className="btn-business mx-2">
                    + List Your Business
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary" className="mx-2 btn-login">
                    Login
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button variant="outline-primary" className="mx-2 btn-register">
                    Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}

            {userInfo && userInfo.role === "Admin" && (
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => navigate("/admin")}
              >
                Admin
              </Button>
            )}

            <Button
              variant="outline-secondary"
              className="btn-theme mx-2"
              onClick={toggleTheme}
            >
              {themeIcon}
            </Button>
          </Nav>
        </Navbar.Collapse>

        <div className="time-icon ms-3 d-none d-lg-block">{getTimeIcon()}</div>
      </Container>
    </Navbar>
  );
};

export default Header;
