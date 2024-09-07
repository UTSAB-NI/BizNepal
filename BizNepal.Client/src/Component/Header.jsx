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

  const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return (
        <div>
          <small className="mx-3 fs-1">🌅 </small>
        </div>
      );
    } else if (hours < 18) {
      return (
        <div>
          <small className="mx-3 fs-1">🌞</small>
        </div>
      );
    } else {
      return (
        <div>
          <small className="mx-3 fs-1">🌙</small>
        </div>
      );
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {getTime()}
        <Navbar.Brand as={Link} to="/">
          <Image src="/images/biznepallogo.png" style={{ width: "150px" }} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="toggle-btn"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Searchbox />
          </Nav>

          <Nav>
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
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant="primary" className="btn-login">
                  Login
                </Button>
              </Nav.Link>
            )}

            {userInfo && userInfo.role === "Admin" ? (
              <Button
                variant="primary"
                className="btn-business"
                onClick={() => navigate("/admin")}
              >
                Admin
              </Button>
            ) : (
              <Nav.Link as={Link} to="/register">
                <Button variant="primary" className="btn-business">
                  + List Your Business
                </Button>
              </Nav.Link>
            )}

            <Button
              variant="outline-primary"
              className="btn-theme mx-2"
              onClick={toggleTheme}
            >
              {themeIcon}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
