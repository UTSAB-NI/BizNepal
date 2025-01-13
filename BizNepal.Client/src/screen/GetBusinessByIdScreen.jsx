import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Button, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetbusinessByIdQuery,
  useCreateBookmarkMutation,
  // useGetBookmarkedQuery,
  // useDeleteBookmarksMutation,
} from "../slices/userApiSlices";
import Loader from "../Component/Loader";
import CreateReview from "../Component/CreateReview";
import BusinessMap from "../Component/BusinessMap";
import BusinessReviewGraph from "../Component/BusinessReviewGraph";
import "../Customcss/getbusinessbyid.css"; // Custom CSS for styling

const API_BASE_URL = "https://localhost:5000";

const GetBusinessByIdScreen = () => {
  const [Feedback, setFeedback] = useState(false);
  const { id: businessid } = useParams();
  const {
    data: businessdatabyid,
    isLoading,
    isError,
    refetch,
  } = useGetbusinessByIdQuery(businessid);

  // const [
  //   createBookmark,
  //   { isLoading: BookmarkedCreateLoading, isError: createBookmarkError },
  // ] = useCreateBookmarkMutation();

  useEffect(() => {
    if (isError) {
      setFeedback(
        businessdatabyid?.message || "An error occurred. Please try again later"
      );
    }
  }, [isError, businessdatabyid]);

  const imageUrl = `${API_BASE_URL}${businessdatabyid?.businessImages[0]?.imageUrl}`;
  // const imageUrl = "/images/image.png";

  const BookmarkController = async (businessid) => {
    localStorage.setItem("bookmark", businessid);
    // const response = await createBookmark({ businessId: businessid });
    // if (!response) {
    //   setFeedback("Bookmark Added Failed");
    //   console.log(response);
    // }
    setFeedback("Bookmark Added Successfully");
    console.log("BookmarkController", businessid);
    window.location.reload();
  };
  return (
    <Container className="business-container">
      {isLoading && <Loader />}
      {Feedback && (
        <Alert variant="danger" onClose={() => setFeedback("")} dismissible>
          {Feedback}
        </Alert>
      )}
      {businessdatabyid && (
        <>
          {/* Hero Section */}
          <div className="hero-section">
            <Image src={imageUrl} alt="Business" className="hero-image" />
            <div className="hero-overlay ">
              <h1>{businessdatabyid.businessName}</h1>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 mx-2">
                  {businessdatabyid.category.categoryName}
                </p>
                <button
                  // className={`${
                  //   businessid === localStorage.getItem("bookmark")
                  //     ? "bookmark-button"
                  //     : "bookmark-button"
                  // }
                  // `}
                  className="bookmark-button"
                  onClick={() => BookmarkController(businessid)}
                >
                  <i className="fas fa-bookmark me-2"></i>
                  Bookmark
                </button>
              </div>
            </div>
          </div>

          {/* Business Information and Map */}
          <Row className="g-4">
            <Col md={4}>
              <div className="business-card p-4">
                <h3 className="mb-4">Business Information</h3>

                {/* Location */}
                <div className="info-row d-flex align-items-center mb-4">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <small className="text-muted">Location</small>
                    <p className="mb-0 fw-bold">
                      {businessdatabyid.address.district},{" "}
                      {businessdatabyid.address.city}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="info-row d-flex align-items-center mb-4">
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <small className="text-muted">Contact</small>
                    <p className="mb-0 fw-bold">
                      {businessdatabyid.phoneNumber || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="info-row d-flex align-items-center mb-4">
                  <div className="info-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <small className="text-muted">Website</small>
                    <a
                      href={businessdatabyid.website}
                      target="_blank"
                      rel="noreferrer"
                      className="d-block fw-bold"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>

                {/* Get Directions Button */}
                <Button
                  className="action-button w-100"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${businessdatabyid.location.latitude},${businessdatabyid.location.longitude}`,
                      "_blank"
                    )
                  }
                >
                  <i className="fas fa-location-arrow me-2"></i>
                  Get Directions
                </Button>
              </div>
            </Col>

            <Col md={8}>
              <div className="business-card p-4">
                {/* Map Container */}
                <div className="map-container">
                  <BusinessMap
                    latitude={businessdatabyid.location.latitude}
                    longitude={businessdatabyid.location.longitude}
                  />
                </div>

                {/* About Business */}
                <h3>About {businessdatabyid.businessName}</h3>
                <p className="lead">{businessdatabyid.description}</p>
              </div>
            </Col>
          </Row>

          {/* Sentiment Meter */}
          <div className="sentiment-meter">
            <h3 className="text-center mb-4">Customer Satisfaction Index</h3>
            <Row className="g-4">
              <Col md={4}>
                <div className="stats-card">
                  <div
                    className="satisfaction-circle"
                    style={{ "--percentage": "75%" }}
                  >
                    75%
                  </div>
                  <h4>Positive Reviews</h4>
                  <p className="satisfaction-label">Customer Satisfaction</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stats-card">
                  <div
                    className="satisfaction-circle"
                    style={{ "--percentage": "15%" }}
                  >
                    15%
                  </div>
                  <h4>Neutral Reviews</h4>
                  <p className="satisfaction-label">Average Experience</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stats-card">
                  <div
                    className="satisfaction-circle"
                    style={{ "--percentage": "10%" }}
                  >
                    10%
                  </div>
                  <h4>Areas to Improve</h4>
                  <p className="satisfaction-label">
                    Improvement Opportunities
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Reviews and Analytics */}
          <Row className="g-4">
            <Col md={6}>
              <div className="review-section">
                <h3>Share Your Experience</h3>
                <div className="review-form">
                  <CreateReview businessId={businessdatabyid.businessId} />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="review-section">
                <h3>Review Analytics</h3>
                <BusinessReviewGraph reviews={businessdatabyid.reviews} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default GetBusinessByIdScreen;
