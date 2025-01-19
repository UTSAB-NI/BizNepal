import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Form,
  Alert,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "../Customcss/loginpage.css";
import { useLoginMutation } from "../slices/userApiSlices";
import { setCredentials } from "../slices/authSlices";

const LoginScreen = () => {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userIdentifier || !password) {
      setFeedback("Please fill all the fields.");
      return;
    }
    try {
      const res = await login({ userIdentifier, password }).unwrap();

      if (res) {
        dispatch(setCredentials(res));
        navigate("/");
        toast.success("Login Success");
      } else {
        setFeedback("Username or password is incorrect.");
      }
    } catch (error) {
      setFeedback(error?.data || "An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="login-container">
      <Row className="d-flex justify-content-center align-items-center ">
        <Col md={6} lg={4} className="login-form-section">
          <div className="back-btn">
            <Link to="/" className="text-dark">
              <i className="fas fa-arrow-left fs-5"></i>
            </Link>
          </div>

          <div className="text-center mb-4">
            <img
              src="/images/biznepallogo.png"
              alt="BizNepal Logo"
              className="img-fluid"
              style={{ maxWidth: "185px" }}
            />
            <h3 className="mt-3 text-primary">Welcome Back</h3>
            <p className="text-muted">Sign in to continue to BizNepal</p>
          </div>

          {feedback && (
            <Alert variant="danger" dismissible onClose={() => setFeedback("")}>
              {feedback}
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3 gradient-custom-2" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>

          <div className="text-center mb-3">
            <Link to="/forgotpassword" className="text-muted">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center">
            <p className="mb-0 text-muted">Don't have an account?</p>
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
