import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../Customcss/accountSettings.css";
import { useGetUserByIdQuery } from "../slices/userApiSlices";

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //using praameter from url to fetch user data

  const { id } = useParams();

  //fetching user data
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);
  console.log("userdata", user);

  const previousPassword = user?.passwordHash;

  const showAlert = (message, type = "danger") => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    // Basic validation
    if (newPassword !== confirmPassword) {
      showAlert("New passwords do not match");
      return;
    }

    if (newPassword === currentPassword) {
      showAlert("New password must be different from current password");
      return;
    }

    if (previousPassword !== currentPassword) {
      showAlert("Current password is incorrect");
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate an API call to update the password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      showAlert("Password updated successfully", "success");

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showAlert("Failed to update password. Please try again.");
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
              <h1 className="settings-title">Account Settings</h1>
            </Col>
          </Row>

          {alert.message && (
            <Alert variant={alert.type} className="mt-3">
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handlePasswordChange} id="password-form">
            <Form.Group className="form-group">
              <Form.Label htmlFor="current-password" className="form-label">
                Current Password
              </Form.Label>
              <Form.Control
                type="password"
                id="current-password"
                className="form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                // minLength={8}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label htmlFor="new-password" className="form-label">
                New Password
              </Form.Label>
              <Form.Control
                type="password"
                id="new-password"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                // minLength={8}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label htmlFor="confirm-password" className="form-label">
                Confirm New Password
              </Form.Label>
              <Form.Control
                type="password"
                id="confirm-password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                // minLength={8}
              />
            </Form.Group>

            <Button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountSettings;
