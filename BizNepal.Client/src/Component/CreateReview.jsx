import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import {
  useCreateReviewMutation,
  useGetUserReviewQuery,
} from "../slices/userApiSlices";

const CreateReview = ({ businessId }) => {
  // Get the review
  const {
    data: businessReviewData,
    isLoading: reviewLoading,
    isError: reviewError,
    refetch,
  } = useGetUserReviewQuery();

  // Post the review
  const [
    createReview,
    { isLoading: createReviewLoading, isError: createReviewError },
  ] = useCreateReviewMutation();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        businessId,
        comment,
        rating,
      };

      const response = await createReview(reviewData).unwrap();

      console.log(response);
      refetch();
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    setComment("");
    setRating(1);
  };

  return (
    <>
      <Card className="my-4 p-3 shadow-sm">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontSize: "1.5rem" }}
          >
            Leave a Review
          </Card.Title>
          <Form onSubmit={submitHandler}>
            {/* Comment Section */}
            <Form.Group controlId="comment" className="mb-3">
              <Form.Label className="fw-bold">Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded"
              />
            </Form.Group>

            {/* Star Rating Section */}
            <Form.Group controlId="rating" className="mb-4">
              <Form.Label className="fw-bold">Rating</Form.Label>
              <Row>
                <Col className="d-flex align-items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`fs-4 ${
                        rating >= star ? "text-warning" : "text-secondary"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                  <span className="fw-semibold text-muted">({rating})</span>
                </Col>
              </Row>
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="success"
              className="w-100 py-2"
              style={{ fontSize: "1rem" }}
            >
              {reviewLoading || createReviewLoading
                ? "Submitting..."
                : "Submit Review"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Get comment section */}
      {businessReviewData && businessReviewData.length > 0 ? (
        <Card className="my-4 p-3 shadow-sm">
          <Card.Body>
            <Card.Title
              className="text-center mb-4"
              style={{ fontSize: "1.5rem" }}
            >
              Reviews
            </Card.Title>
            {businessReviewData
              .filter((review) => review.businessId === businessId)
              .map((review) => (
                <Card key={review.reviewId} className="mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{review.createdBy}</strong>
                      <span className="text-muted ms-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`fs-6 ${
                            review.rating >= star
                              ? "text-warning"
                              : "text-secondary"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </Card>
              ))}
          </Card.Body>
        </Card>
      ) : (
        <div>No reviews available</div>
      )}
    </>
  );
};

export default CreateReview;
