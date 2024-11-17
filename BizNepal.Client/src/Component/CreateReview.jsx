import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import {
  useCreateReviewMutation,
  useGetUserReviewQuery,
} from "../slices/userApiSlices";

const CreateReview = () => {
  const {
    data: businessReviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useGetUserReviewQuery();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const ReviewData = {
    comment,
    rating,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ReviewData", ReviewData);
  };

  return (
    <Card className="my-4 p-3 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4" style={{ fontSize: "1.5rem" }}>
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
            Submit Review
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateReview;
