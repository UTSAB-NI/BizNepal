import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form, Alert } from "react-bootstrap";
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

  const [login, { isLoading, isError }] = useLoginMutation();
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
      setFeedback(
        error?.data || "An error occurred. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MDBContainer fluid className="login-container">
      <MDBRow className="d-flex justify-content-center align-items-center vh-100">
        <MDBCol md="6" className="login-form-section">
          <div className="back-btn">
            <Link to="/" className="text-dark">
              <i className="fas fa-arrow-left text-dark fs-5"></i>
            </Link>
          </div>

          <div className="text-center mb-4 ">
            <img
              src="/images/biznepallogo.png"
              alt="BizNepal Logo"
              style={{ width: "185px" }}
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
            <MDBInput
              wrapperClass="mb-4"
              label="Username or Email"
              id="userIdentifier"
              type="text"
              value={userIdentifier}
              onChange={(e) => setUserIdentifier(e.target.value)}
            />
            <div className="position-relative mb-4">
              <MDBInput
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
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
            </div>
            <MDBBtn
              type="submit"
              className="mb-4 w-100 gradient-custom-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </MDBBtn>
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginScreen;
