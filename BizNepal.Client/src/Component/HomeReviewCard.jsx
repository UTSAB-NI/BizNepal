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

import "../Customcss/Landingpagereview.css";

const ReviewCard = ({ reviews }) => {
  // Sort reviews by createdAt in descending order (most recent first)
  const sortedReviews = Array.isArray(reviews)
    ? [...reviews]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order (most recent first)
        .slice(0, 5) // Display only the first 5 reviews
    : [];

  return (
    <div className="landingpage-review-section bg-light" id="review">
      <h2 className="section-title text-center">Recent Reviews</h2>
      <p className="section-subtitle text-center mt-3">
        See what people are saying about local businesses
      </p>
      <div className="landingpage-review-content">
        {sortedReviews &&
          sortedReviews.map((review, index) => {
            const {
              data: user,
              isLoading,
              error,
            } = useGetUserByIdQuery(review.userId);

            return (
              <div className="reviews-container">
                <Card key={index} className="review-card">
                  <Row>
                    {/* User Avatar */}
                    <Col xs={2} className="text-center">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : error ? (
                        <div>Error loading user</div>
                      ) : (
                        <Image
                          src="/images/woman.png"
                          roundedCircle
                          alt="User Avatar"
                          className="reviewer-avatar"
                        />
                      )}
                    </Col>

                    {/* Review Details */}
                    <Col xs={10}>
                      <Row className="align-items-center">
                        <Col xs={8}>
                          <h5 className="reviewer-name">
                            {isLoading
                              ? "Loading..."
                              : user?.userName || "Anonymous"}
                          </h5>
                          <p className="business-name">
                            {review?.business?.businessName}
                          </p>
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
                            {Array.from(
                              { length: review.rating || 0 },
                              (_, i) => (
                                <FaStar key={i} />
                              )
                            )}
                          </span>
                        </Col>
                      </Row>

                      {/* Business and Comment */}
                      <Row>
                        <Col xs={12}>
                          <p className="review-text">
                            {review.comment.split(" ").slice(0, 10).join(" ")}
                          </p>
                        </Col>
                        <small className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                      </Row>

                      {/* Interaction Buttons */}
                      {/* <Row>
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
                    </Row> */}
                    </Col>
                  </Row>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ReviewCard;
