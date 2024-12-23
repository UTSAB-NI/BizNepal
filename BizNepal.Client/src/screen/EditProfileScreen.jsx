import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../Customcss/editProfile.css";
import { useGetUserByIdQuery } from "../slices/userApiSlices";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const showAlert = (message, type = "danger") => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showAlert("Profile updated successfully", "success");
    } catch (error) {
      showAlert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="settings-card">
        <Card.Body>
          <Row className="settings-header">
            <Col xs={1}>
              <Button
                variant="light"
                className="back-button"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </Button>
            </Col>
            <Col>
              <h1 className="settings-title">Edit Profile</h1>
            </Col>
          </Row>

          {alert.message && (
            <Alert variant={alert.type} className="mt-3">
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handleProfileUpdate} id="profile-form">
            <Form.Group className="form-group">
              <Form.Label htmlFor="username" className="form-label">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                className="form-input"
                value={formData.username}
                onChange={handleInputChange}
                required
                minLength={3}
                maxLength={32}
                pattern="[a-zA-Z0-9_]+"
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label htmlFor="email" className="form-label">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label htmlFor="phone" className="form-label">
                Phone Number
              </Form.Label>
              <Form.Control
                type="tel"
                id="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                placeholder="1234567890"
              />
            </Form.Group>

            <Button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
