import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate(); // To handle redirection

  const submitHandler = async (e) => {
    e.preventDefault();

    const Registerdetails = {
      userName: username,
      password,
      role,
    };
    try {
      const response = await axios.post(
        "https://localhost:5000/api/Auth/Register",
        Registerdetails
      );
      if (response.status === 200) {
        toast.success("Register success");
        setUsername("");
        setPassword("");
        setRole("");
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (error) {
      setFeedback("Registration failed");
    }
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

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
        </Form>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </Container>
    </>
  );
};

export default RegisterScreen;