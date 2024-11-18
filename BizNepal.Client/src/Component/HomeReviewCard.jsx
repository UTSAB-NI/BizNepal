import React from "react";
import { Card, Row, Col, Image, Badge, Button } from "react-bootstrap";
import {
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaFacebook,
} from "react-icons/fa";

import { useGetUserByIdQuery } from "../slices/userApiSlices";

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
        reviews.map((review, index) => {
          const {
            data: user,
            isLoading,
            error,
          } = useGetUserByIdQuery(review.userId);

          return (
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
                {/* User Avatar */}
                <Col xs={2} className="text-center">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div>Error loading user</div>
                  ) : (
                    <Image
                      src= "/images/woman.png"
                      roundedCircle
                      alt="User Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </Col>

                {/* Review Details */}
                <Col xs={10}>
                  <Row className="align-items-center">
                    <Col xs={8}>
                      <h5 style={{ margin: 0 }}>
                        {isLoading
                          ? "Loading..."
                          : user?.userName || "Anonymous"}
                      </h5>
                      <small>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </Col>
                    <Col xs={4} className="text-end">
                      <Badge bg="success" style={{ fontSize: "0.8rem" }}>
                        Reviewed
                      </Badge>
                    </Col>
                  </Row>

                  {/* Rating */}
                  <Row className="mt-2">
                    <Col xs={12}>
                      <span style={{ color: "#FFD700" }}>
                        {Array.from({ length: review.rating || 0 }, (_, i) => (
                          <FaStar key={i} />
                        ))}
                      </span>
                    </Col>
                  </Row>

                  {/* Business and Comment */}
                  <Row>
                    <Col xs={12}>
                      <strong>
                        {review?.business?.businessName || "Business"}
                      </strong>
                      <p style={{ fontSize: "0.9rem", color: "#333" }}>
                        {review.comment || "No comment provided."}
                      </p>
                    </Col>
                  </Row>

                  {/* Interaction Buttons */}
                  <Row>
                    <Col xs={8}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                      >
                        <FaThumbsUp />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                      >
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
          );
        })}
    </div>
  );
};

export default ReviewCard;
