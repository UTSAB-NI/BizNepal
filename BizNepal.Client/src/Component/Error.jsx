// OopsError.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const OopsError = ({ message }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops!</h1>
      <p style={styles.message}>{message || "Something went wrong."}</p>
      <Link to="/" style={styles.button}>
        Go Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  title: {
    fontSize: "48px",
    color: "#333",
  },
  message: {
    fontSize: "24px",
    color: "#666",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#ff5a5f",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "18px",
  },
};

export default OopsError;
