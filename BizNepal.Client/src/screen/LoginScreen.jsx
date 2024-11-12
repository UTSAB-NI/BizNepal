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
  MDBIcon,
} from "mdb-react-ui-kit";
import { Form, Alert } from "react-bootstrap";
import "../Customcss/loginpage.css";
import { useLoginMutation } from "../slices/userApiSlices";
import { setCredentials } from "../slices/authSlices";

const LoginScreen = () => {
  
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", { userIdentifier, password });
    try {
      const res = await login({ userIdentifier, password }).unwrap();

      if (res) {
        dispatch(setCredentials(res));
        navigate("/");
        toast.success("Login Success");
      } else {
        setFeedback("Username or password Incorrect");
      }
    } catch (error) {
      setFeedback(error.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {feedback && (
        <Alert variant="danger" dismissible onClose={() => setFeedback("")}>
          {feedback}
        </Alert>
      )}

      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="images/biznepallogo.png"
                  style={{ width: "185px" }}
                  alt="logo"
                />
              </div>
              <Form onSubmit={submitHandler}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username or Email"
                  id="form1"
                  type="text"
                  value={userIdentifier}
                  onChange={(e) => setUserIdentifier(e.target.value)}
                />
                <div className="position-relative mb-4"> {/* Wrap password input and button */}
                  <MDBInput
                    label="Password"
                    id="form2"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="position-absolute"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)", // Center vertically
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      zIndex: 1,
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div>
                  <MDBBtn
                    type="submit"
                    className="mb-4 gradient-custom-2 w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </MDBBtn>
                </div>
                <div className="text-center mb-4">
                  <Link to="/forgotpassword" className="text-muted">
                    Forgot Password?
                  </Link>
                </div>
              </Form>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0 text-muted">Don't have an account?</p>
                <Link to="/register">
                  <MDBBtn outline className="mx-2" color="danger">
                    Register
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </MDBCol>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-3 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default LoginScreen;
