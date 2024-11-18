import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetUserReviewQuery,
} from "../slices/userApiSlices";

const StarRating = ({ rating, onClick, size = "fs-4", editable = true }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${size} ${
            rating >= star ? "text-warning" : "text-secondary"
          }`}
          style={{ cursor: editable ? "pointer" : "default" }}
          onClick={() => editable && onClick && onClick(star)}
        >
          ★
        </span>
      ))}
      {editable && <span className="fw-semibold text-muted">({rating})</span>}
    </div>
  );
};

const CreateReview = ({ businessId }) => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const { userInfo: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Get user reviews
  const {
    data: businessReviewData = [],
    isLoading: reviewLoading,
    isError: reviewError,
    refetch,
  } = useGetUserReviewQuery();

  // Create review mutation
  const [createReview, { isLoading: createReviewLoading }] =
    useCreateReviewMutation();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      return navigate("/login");
    }

    try {
      const reviewData = { businessId, comment, rating };
      const response = await createReview(reviewData).unwrap();
      refetch();
      setComment("");
      setRating(1);
    } catch (error) {
      console.error("Error submitting review:", error);
      setFeedback(error.data);
      setFeedbackType("danger");
    }
  };

  const filteredReviews = businessReviewData.filter(
    (review) => review.businessId === businessId
  );

  return (
    <>
      {/* Review Form */}

      <Card className="my-4 p-3 shadow-sm">
        {feedback && (
          <Alert
            variant={feedbackType}
            onClose={() => setFeedback("")}
            dismissible
          >
            {feedback}
          </Alert>
        )}
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontSize: "1.5rem" }}
          >
            Leave a Review
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="comment" className="mb-3">
              <Form.Label className="fw-bold">Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded"
                required
              />
            </Form.Group>

            <Form.Group controlId="rating" className="mb-4">
              <Form.Label className="fw-bold">Rating</Form.Label>
              <StarRating rating={rating} onClick={setRating} />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100 py-2"
              style={{ fontSize: "1rem" }}
              disabled={reviewLoading || createReviewLoading}
            >
              {createReviewLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Reviews Section */}
      <Card className="my-4 p-3 shadow-sm">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontSize: "1.5rem" }}
          >
            Reviews
          </Card.Title>
          {reviewLoading ? (
            <div>Loading reviews...</div>
          ) : reviewError ? (
            <div>Error fetching reviews. Please try again later.</div>
          ) : filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Card key={review.reviewId} className="mb-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{review.createdBy}</strong>
                    <span className="text-muted ms-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <StarRating
                    rating={review.rating}
                    size="fs-6"
                    editable={false}
                  />
                </div>
                <p className="mt-2">{review.comment}</p>
              </Card>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateReview;
