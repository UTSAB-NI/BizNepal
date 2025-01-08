import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetUserReviewQuery,
  useGetcreatedbusinessByUserQuery,
} from "../../slices/userApiSlices";
import TokenDecode from "../../Component/TokenDecode";
import "../../Customcss/businessDashboard.css"; // Ensure this CSS file is imported

const AllReview = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null;

  const {
    data: createdBusiness,
    error: reviewError,
    isLoading: reviewLoading,
  } = useGetcreatedbusinessByUserQuery(userId);
  console.log("createdBusiness", createdBusiness);

  const businessReview = createdBusiness?.map(
    (business) => business?.reviews
  );
  
  console.log("businessReview", businessReview);

  const {
    data: userReview,
    error: userReviewError,
    isLoading: userReviewLoading,
  } = useGetUserReviewQuery();

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  // Handle loading and errors
  if (userReviewLoading) return <div>Loading...</div>;
  if (userReviewError) return <div>Error: {userReviewError?.message}</div>;

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <Container>
          <div className="d-flex justify-content-center align-items-center text-center">
            <div>
              <h1>
                <FaStar className="me-2" /> All Reviews
              </h1>
              <p className="mb-0">View and manage all customer feedback</p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Reviews List */}
        <Row className="mt-4">
          {businessReview[0]?.map((review) => (
            <Col md={6} key={review.reviewId} className="mb-4">
              <Card className="review-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="text-mute text-secondary">{review.business.businessName}</h6>
                      <h5 className="card-title">{review.comment}</h5>
                      <div className="rating-stars mb-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="review-date">
                      Posted on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.response && (
                    <div className="review-response mt-3">
                      <h6>
                        <FaStar className="me-2" /> Response from Business
                      </h6>
                      <p className="mb-0">{review.response}</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllReview;
