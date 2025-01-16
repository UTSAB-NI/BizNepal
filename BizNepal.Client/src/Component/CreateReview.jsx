import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// User API slices
import {
  useCreateReviewMutation,
  useGetUserReviewQuery,
  useGetUserByIdQuery,
} from "../slices/userApiSlices";
import { FaStar, FaUserCircle } from "react-icons/fa"; // Adding icons for better visualization
import "../Customcss/CreateReview.css"; // Custom CSS for styling

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
  const [sentiment, setSentiment] = useState(null); // For sentiment analysis result

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
      // Handle the sentiment analysis before submitting the review

      const reviewData = { businessId, comment, rating, sentiment };
      const response = await createReview(reviewData).unwrap();
      window.location.reload();
      setComment("");
      setRating(1);
      setFeedback("Review submitted successfully!");
      setFeedbackType("success");
    } catch (error) {
      console.error("Error submitting review:", error);
      setFeedback(error.data || "Failed to submit review. Please try again.");
      setFeedbackType("danger");
    }
  };

  const filteredReviews = businessReviewData.filter(
    (review) => review.businessId === businessId
  );

  console.log("filteredReviews", filteredReviews);

  return (
    <>
      {/* Review Form */}
      <div className="create-review">
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
                  as="textarea"
                  rows={3}
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
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : reviewError ? (
              <div className="text-center text-danger">
                Error fetching reviews. Please try again later.
              </div>
            ) : filteredReviews.length > 0 ? (
              filteredReviews.map((review) => {
                const { data: userdata } = useGetUserByIdQuery(review.userId);
                console.log("userdata", userdata);
                return (
                  <Card key={review.reviewId} className="mb-3 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-4 text-muted" />
                        <strong>{userdata?.userName}</strong>
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
                );
              })
            ) : (
              <div className="text-center text-muted">No reviews available</div>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateReview;
