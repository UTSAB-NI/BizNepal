import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";
import "../Customcss/header.css";

const Header = () => {
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("userInfo");
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
            {localStorage.getItem("userInfo") ? (
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
            {/* <Nav.Link as={Link} to="/login">
              <Button variant="primary" className="btn-login">
                Login
              </Button>
            </Nav.Link> */}
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
