import React from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaBook } from "react-icons/fa";

const HelpScreen = () => {
  // Sample FAQs
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage and fill out the required information.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click on 'Forgot Password'. Enter your email address to receive a password reset link.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support via email at support@biznepal.com or call us at +977-123456789.",
    },
    {
      question: "Where can I find tutorials?",
      answer:
        "Visit our 'Guides & Tutorials' section or check out our YouTube channel for video tutorials.",
    },
  ];

  // Handle feedback form submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">
            <FaQuestionCircle /> Help & Support
          </h1>
        </Col>
      </Row>

      {/* FAQs Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h2>
            <FaQuestionCircle /> Frequently Asked Questions (FAQs)
          </h2>
          <Accordion defaultActiveKey="0">
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      {/* Contact Support Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h2>
            <FaEnvelope /> Contact Support
          </h2>
          <Card>
            <Card.Body>
              <p>
                <strong>Email:</strong> support@biznepal.com
              </p>
              <p>
                <strong>Phone:</strong> +977-123456789
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Guides & Tutorials Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h2>
            <FaBook /> Guides & Tutorials
          </h2>
          <Card>
            <Card.Body>
              <p>
                Check out our step-by-step guides and video tutorials to get the
                most out of Biz Nepal.
              </p>
              <Button
                variant="primary"
                href="https://www.youtube.com/biznepal"
                target="_blank"
              >
                Watch Tutorials
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpScreen;
