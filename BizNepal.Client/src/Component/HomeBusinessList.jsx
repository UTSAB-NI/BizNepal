import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const BusinessListingSection = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#2E50D4",
        color: "white",
        padding: "50px 20px",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Row className="align-items-center">
        {/* Left Side: Mobile Images */}
        <Col md={6} className="d-flex justify-content-center">
          <div style={{ position: "relative" }}>
            <img
              src="https://via.placeholder.com/150x300.png?text=Phone+1"
              alt="Phone 1"
              style={{
                height: "350px",
                width: "180px",
                marginRight: "20px",
                borderRadius: "20px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            />
            <img
              src="https://via.placeholder.com/150x300.png?text=Phone+2"
              alt="Phone 2"
              style={{
                height: "350px",
                width: "180px",
                position: "absolute",
                top: "30px",
                left: "100px",
                borderRadius: "20px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </Col>

        {/* Right Side: Text and Button */}
        <Col md={6}>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Get your business in front of{" "}
            <span style={{ color: "#FF6F61" }}>local customers.</span>
          </h2>
          <p style={{ fontSize: "1.1rem" }}>
            Manage your <span style={{ color: "#FF6F61" }}>free</span> listing.
            Update your business information in a few steps.
          </p>
          <Link to="/businesslist">
            <Button variant="danger" size="lg" style={{ marginTop: "20px" }}>
              + List your business
            </Button>
          </Link>

          <div style={{ marginTop: "20px", fontSize: "1.5rem" }}>
            <FaFacebook style={{ marginRight: "15px" }} />
            <FaGoogle style={{ color: "#4285F4" }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessListingSection;
