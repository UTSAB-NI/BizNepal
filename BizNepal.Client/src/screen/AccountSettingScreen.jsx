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
import { useUpdateUserPasswordMutation } from "../slices/userApiSlices";

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  // Update password
  const [updateUserPassword, { isloading: updatePassword, iserror }] =
    useUpdateUserPasswordMutation();

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const formdata = {
      currentPassword,
      newPassword,
    };
    // Basic validation
    if (newPassword !== confirmPassword) {
      setFeedback("New passwords do not match");
      setFeedbackType("danger");
      return;
    }

    if (newPassword === currentPassword) {
      setFeedback("New password must be different from current password");
      setFeedbackType("danger");
      return;
    }

    try {
      const res = await updateUserPassword(formdata).unwrap();

      if (res) {
        setFeedback(res?.message);
        setFeedbackType("success");
      }

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setFeedback("Failed to update password. Please try again.");
      setFeedbackType("danger");
    }
  };

  return (
    <Container className="mt-4">
      {feedback && (
        <Alert
          variant={feedbackType}
          onClose={() => setFeedback("")}
          dismissible
        >
          {feedback}
        </Alert>
      )}
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
              disabled={updatePassword}
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
