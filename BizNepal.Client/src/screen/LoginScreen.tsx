import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Customcss/loginpage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submithandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDetails = {
      userName: email,
      password,
    };

    try {
      const response = await axios.post(
        "https://localhost:5000/api/Auth/login",
        userDetails
      );
      if (response && response.data) {
        const token = response.data.jwtToken;
        console.log(response.data);
        console.log(token);
        localStorage.setItem("token", token);
        setEmail("");
        setPassword("");
        navigate("/");
        toast.success("Login Successful !!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
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
              {/* <h4 className="mt-1 mb-5 pb-1">
                Log Into us for finding you need
              </h4> */}
            </div>

            <Form onSubmit={submithandler}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="">
                <MDBBtn type="submit" className="mb-4 gradient-custom-2 w-100">
                  Sign in
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
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
