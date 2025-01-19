import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../Component/Loader";
import { useRegisterMutation } from "../slices/userApiSlices";
import "../Customcss/RegisterScreen.css";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const { username, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validatePassword = () => {
    if (!username || !email || !password || !confirmPassword) {
      setFeedback("Please fill all the required fields");
      return false;
    }

    if (password !== confirmPassword) {
      setFeedback("Passwords do not match");
      return false;
    }
    if (!emailRegex.test(email)) {
      setFeedback("Please enter a valid email address");
      return false;
    }

    if (!regex.test(password)) {
      setFeedback(
        "Password must contain at least 6 characters, 1 uppercase letter, 1 number, and 1 special character"
      );
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      // const response = await register({
      //   userName: username,
      //   email,
      //   password,
      //   role,
      // }).unwrap();
      // toast.success(response.message);
      localStorage.setItem("data", JSON.stringify(formData));
      navigate("/selectrole");
    } catch (error) {
      setFeedback(
        error.data?.message ||
          JSON.stringify(error?.data) || // For debugging, convert the object to a string
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container className="register-container my-5">
      <div className="back-btn">
        <Link to="/">
          <i className="fas fa-arrow-left fs-5 text-dark"></i>
        </Link>
      </div>

      <div className="text-center mb-4">
        <h1>
          Register To <span className="text-primary">biz</span>
          <span className="text-danger">nepal</span>
        </h1>
        <p className="text-muted">Create an account to get started</p>
      </div>

      {feedback && (
        <Alert variant="danger" dismissible onClose={() => setFeedback("")}>
          {feedback}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="register-form">
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3 position-relative">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </Form.Group>

        <Form.Group
          controlId="confirmPassword"
          className="mb-3 position-relative"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100 gradient-custom-2"
          disabled={isLoading}
        >
          {isLoading ? "Continue..." : "Continue"}
        </Button>

        {isLoading && <Loader />}
      </Form>

      <div className="text-center mt-3">
        <span className="text-muted">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </Container>
  );
};

export default RegisterScreen;
