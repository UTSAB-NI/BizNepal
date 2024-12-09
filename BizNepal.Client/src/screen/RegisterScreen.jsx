import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";

import Loader from "../Component/Loader";
import { useRegisterMutation } from "../slices/userApiSlices";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const RegistrationDetails = {
      userName: username,
      email,
      password,
      role,
    };
    console.log("RegistrationDetails", RegistrationDetails);

    try {
      const response = await register(RegistrationDetails).unwrap();

      toast.success(response.message);
      navigate("/login");
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
      <Container className="my-3">
        <h1>
          Register To <span className="text-primary">biz</span>
          <span className="text-danger">nepal</span>
        </h1>
        <Form onSubmit={submitHandler} className="my-4">
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3 position-relative">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="position-absolute"
              style={{
                right: "10px",
                top: "35px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Toggle icon based on state */}
            </button>
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="GeneralUser">GeneralUser</option>
              <option value="BusinessOwner">BusinessOwner</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
          {isLoading && <Loader />}
        </Form>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </Container>
    </>
  );
};

export default RegisterScreen;
