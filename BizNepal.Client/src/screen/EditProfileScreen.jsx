import React, { useState, useEffect } from "react";
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
import "../Customcss/editProfile.css";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../slices/userApiSlices";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [feedback, setFeedback] = useState("");
  const [feedbacktype, setFeedbacktype] = useState("danger");

  const { id } = useParams();
  const { data: user, error, isLoading, refetch } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading: updateloading, isError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const res = await updateUser({ ...formData }).unwrap();

      setFeedback(res?.message);
      setFeedbacktype("success");
      refetch();
    } catch (error) {
      setFeedback("Failed to update profile. Please try again.");
      setFeedbacktype("danger");
    }
  };

  return (
    <Container className="mt-4">
      {feedback && (
        <Alert
          variant={feedbacktype}
          onClose={() => setFeedback("")}
          dismissible
        >
          <p>{feedback}</p>
        </Alert>
      )}
      <Card className="settings-card">
        <Card.Body>
          <Row className="settings-header">
            <Col>
              <h1 className="settings-title">Edit Profile</h1>
            </Col>
          </Row>

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
              disabled={updateloading}
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
