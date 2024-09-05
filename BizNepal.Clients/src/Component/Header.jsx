import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";
import "../Customcss/header.css";
import { Logout } from "../slices/authSlices"; // assuming you have a logout action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout()); 
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
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
          </Nav>

          <Nav>
            {userInfo ? (
              <Button
                variant="primary"
                className="btn-login"
                onClick={logouthandler}
              >
                Logout
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant="primary" className="btn-login">
                  Login
                </Button>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/register">
              <Button variant="primary" className="btn-business">
                + List Your Business
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
