import React from "react";
import { ProgressBar, Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa"; // Adding star icons for better visualization

const BusinessReviewGraph = ({ reviews }) => {
  const getRatingVariant = (rating) => {
    if (rating >= 4) return "success"; // High ratings
    if (rating >= 3) return "info"; // Medium ratings
    if (rating >= 2) return "warning"; // Low ratings
    return "danger"; // Very low ratings
  };

  return (
    <div className="my-4">
      <h4>Review Graph </h4>
      <Row>
        {reviews &&
          reviews.map((review, index) => (
            <Col key={index} xs={12} md={6} lg={4} className="mb-3">
              <ProgressBar
                variant={getRatingVariant(review.rating)}
                now={review.rating * 10}
                label={`Rating: ${review.rating}`}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default BusinessReviewGraph;
