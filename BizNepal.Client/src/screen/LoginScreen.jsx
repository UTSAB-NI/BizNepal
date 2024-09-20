import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
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
  const [userName, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

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
    console.log("Submitting form with data:", { userName, password });
    try {
      const res = await login({ userName, password }).unwrap();

      if (res) {
        dispatch(setCredentials(res));
        navigate("/");
        toast.success("Login Success");
      } else {
        setFeedback("Username or password Incorrect");
      }
    } catch (error) {
      setFeedback("🤦‍♂️ oops Failed to Login");
    }
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
                {/* <div className="text-center mb-2">
                  <p className="lead fw-normal mb-3 me-3">Sign in with</p>
                  <MDBBtn floating size="md" tag="a" className="me-2 mb-3">
                    <MDBIcon fab icon="google" />
                  </MDBBtn>
                </div>
                <div className="divider d-flex align-items-center justify-content-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div> */}
              </div>
              <Form onSubmit={submitHandler}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  value={userName}
                  onChange={(e) => setusername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
