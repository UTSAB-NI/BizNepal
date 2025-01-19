import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Button, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetbusinessByIdQuery,
  useGetBookmarkedQuery,
  useCreateBookmarkMutation,
  useBusinessAnalyticsQuery,
} from "../slices/userApiSlices";
import Loader from "../Component/Loader";
import CreateReview from "../Component/CreateReview";
import BusinessMap from "../Component/BusinessMap";
import BusinessReviewGraph from "../Component/BusinessReviewGraph";
import "../Customcss/getbusinessbyid.css"; // Custom CSS for styling
import SentimentMeter from "../Component/SentimentMeter"; // Import the SentimentMeter component
import LineChartComponent from "../Component/Admin/LineGraph"; // Import the LineChartComponent component

const API_BASE_URL = "https://localhost:5000";

const GetBusinessByIdScreen = () => {
  const [feedback, setFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState();
  const { id: businessid } = useParams();

  const {
    data: businessdatabyid,
    isLoading,
    isError,
    refetch,
  } = useGetbusinessByIdQuery(businessid);

  const {
    data: businessAnalyticsData,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useBusinessAnalyticsQuery(businessid);

  const [
    createBookmark,
    { isLoading: bookmarkLoading, isError: bookmarkError },
  ] = useCreateBookmarkMutation();

  const { data: bookmarkData } = useGetBookmarkedQuery();

  const [bookmarkedBusinessID, setBookmarkedBusinessID] = useState([]);

  // useEffect(() => {
  //   if (bookmarkData) {
  //     setBookmarkedBusinessID(
  //       bookmarkData.map((bookmark) => bookmark.businessId)
  //     );
  //   }
  // }, [bookmarkData]);

  useEffect(() => {
    if (isError) {
      setFeedback(
        businessdatabyid?.message || "An error occurred. Please try again later"
      );
      setFeedbackType("danger");
    }
  }, [isError, businessdatabyid]);

  const imageUrl = `${API_BASE_URL}${businessdatabyid?.businessImages[0]?.imageUrl}`;

  const handleBookmark = async (businessid) => {
    try {
      const response = await createBookmark(businessid).unwrap();
      setFeedback(response?.message || "Bookmark Added Successfully");
      setFeedbackType("success");
      // window.location.reload();
    } catch (error) {
      setFeedback("Bookmark Added Failed");
      setFeedbackType("danger");
    }
  };

  if (isLoading || analyticsLoading) {
    return <Loader />;
  }

  if (isError || analyticsError) {
    return (
      <Alert variant="danger">An error occurred. Please try again later.</Alert>
    );
  }

  return (
    <Container className="business-container">
      {feedback && (
        <Alert
          variant={feedbackType}
          onClose={() => setFeedback("")}
          dismissible
        >
          {feedback}
        </Alert>
      )}

      {businessdatabyid && (
        <>
          {/* Hero Section */}
          <div className="hero-section">
            <Image src={imageUrl} alt="Business" className="hero-image" />
            <div className="hero-overlay">
              <button
                className="bookmark-button"
                onClick={() => handleBookmark(businessid)}
                disabled={bookmarkLoading}
              >
                <i className="fas fa-bookmark me-2"></i>
                Bookmark
              </button>
              <h1>{businessdatabyid.businessName}</h1>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 mx-2">
                  {businessdatabyid.category.categoryName}
                </p>
              </div>
            </div>
          </div>

          {/* Business Information and Map */}
          <Row className="g-4">
            <Col md={4}>
              <div className="business-card p-4">
                <h3>About {businessdatabyid.businessName}</h3>
                <p className="lead">{businessdatabyid.description}</p>

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

                {/* Views */}
                <div className="info-row d-flex align-items-center mb-4">
                  <div className="info-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div>
                    <small className="text-muted">Views</small>
                    <div className="fw-bold">
                      {businessdatabyid.totalVisits}
                    </div>
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
              <SentimentMeter businessId={businessid} />
            </Col>
          </Row>

          {/* Reviews and Analytics */}
          <Row className="g-4">
            <Col md={6}>
              <div className="review-section">
                <h3>Review Analytics</h3>
                <BusinessReviewGraph reviews={businessdatabyid.reviews} />
              </div>
            </Col>
            <Col md={6}>
              <div className="review-section">
                <LineChartComponent
                  data={businessAnalyticsData?.visitsByDate.map(
                    (data) => data.count
                  )}
                  labels={businessAnalyticsData?.visitsByDate.map((data) =>
                    new Date(data.date).toLocaleDateString("en-CA")
                  )}
                  grapheader="Visits By Date"
                />
              </div>
            </Col>
          </Row>

          {/* Review Section */}
          <div className="review-section">
            <h3>Share Your Experience</h3>
            <div className="review-form">
              <CreateReview businessId={businessdatabyid.businessId} />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default GetBusinessByIdScreen;
