import React from "react";
import { Card, Row, Col, Image, Badge, Button } from "react-bootstrap";
import {
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaFacebook,
} from "react-icons/fa";

const ReviewCard = ({ reviews }) => {
  return (
    <div
      className="review-section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "#FF7E7E",
        border: "1px solid #FF7E7E",
        padding: "20px",
      }}
    >
      {reviews &&
        reviews.map((review, index) => (
          <Card
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "15px",
              margin: "10px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <Row>
              <Col xs={2} className="text-center">
                <Image
                  src={review.image}
                  roundedCircle
                  alt="User Avatar"
                  style={{ width: "50px", height: "50px" }}
                />
              </Col>
              <Col xs={10}>
                <Row className="align-items-center">
                  <Col xs={8}>
                    <h5 style={{ margin: 0 }}>{review.name}</h5>
                    <small>{review.created_at}</small>
                  </Col>
                  <Col xs={4} className="text-end">
                    <Badge bg="success" style={{ fontSize: "0.8rem" }}>
                      Reviewed
                    </Badge>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12}>
                    <span style={{ color: "#FFD700" }}>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <strong>{review.reviewpostat}</strong>
                    <p style={{ fontSize: "0.9rem", color: "#333" }}>
                      {review.review}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <Button variant="outline-secondary" size="sm" className="me-2">
                      <FaThumbsUp />
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="me-2">
                      <FaThumbsDown />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaHeart />
                    </Button>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Button variant="outline-primary" size="sm">
                      <FaFacebook />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
    </div>
  );
};

export default ReviewCard;
