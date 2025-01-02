import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetUserReviewQuery,
  useGetUserByIdQuery,
} from "../../slices/userApiSlices";
import { Container, Card, Row, Col, ProgressBar, Form } from "react-bootstrap";
import { FaStar, FaCheck, FaReply } from "react-icons/fa";
import "../../Customcss/ParticularBusinessReview.css";

const ParticularBusinessReview = () => {
  const { id: selectedBusinessId } = useParams();
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  // Fetch all reviews
  const { data: userReview, isLoading, error } = useGetUserReviewQuery();

  // Filter reviews for the selected business
  const BusinessReviewFromApi = userReview?.filter(
    (b) => b.businessId === selectedBusinessId
  );

  // Get business details
  const business = BusinessReviewFromApi?.[0]?.business;

  // Calculate average rating
  const averageRating =
    BusinessReviewFromApi?.reduce((sum, review) => sum + review.rating, 0) /
    BusinessReviewFromApi?.length;

  // Filter reviews based on selected rating
  const filteredReviews = BusinessReviewFromApi?.filter((review) => {
    if (selectedRating === "All Ratings") return true;
    return review.rating === parseInt(selectedRating[0]);
  });

  // Fetch user data for all reviews
  const userIds = filteredReviews?.map((review) => review.userId) || [];
  const { data: users } = useGetUserByIdQuery(userIds);

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Dashboard Header */}
      <div className="particularbusiness-header">
        <Container>
          <div className="d-flex justify-content-center align-items-center text-center">
            <div>
              <h1>
                <FaStar className="me-2" /> Reviews for {business?.businessName}
              </h1>
              <p className="mb-0">View and manage customer feedback</p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Review Statistics */}
        <Row className="mb-4">
          <Col md={3}>
            <div className="review-stats bg-primary bg-opacity-10 text-center p-3">
              <h2>{averageRating?.toFixed(1) || "N/A"}</h2>
              <div className="rating-stars mb-2">
                {renderStars(averageRating)}
              </div>
              <p className="mb-0">Average Rating</p>
            </div>
          </Col>
          <Col md={9}>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = BusinessReviewFromApi?.filter(
                (review) => review.rating === stars
              ).length;
              const percentage = (count / BusinessReviewFromApi?.length) * 100;
              return (
                <ProgressBar
                  key={stars}
                  className="mb-3"
                  style={{ height: "25px" }}
                >
                  <ProgressBar
                    variant={
                      stars === 5
                        ? "success"
                        : stars === 4
                        ? "info"
                        : stars === 3
                        ? "warning"
                        : "danger"
                    }
                    now={percentage}
                    label={`${stars} Stars (${count || 0})`}
                  />
                </ProgressBar>
              );
            })}
          </Col>
        </Row>

        {/* Filter Options */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Reviews List */}
        <div className="reviews-container">
          {filteredReviews?.map((review) => (
            <Card key={review.reviewId} className="review-card mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">Anonymous</h5>
                    <div className="rating-stars mb-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="review-date">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="card-text">{review.comment}</p>
                {review.response && (
                  <div className="review-response">
                    <h6>
                      <FaReply className="me-2" /> Response from Business
                    </h6>
                    <p className="mb-0">{review.response}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ParticularBusinessReview;
