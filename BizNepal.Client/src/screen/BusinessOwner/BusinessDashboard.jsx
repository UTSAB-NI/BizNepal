import React, { useEffect, useRef, useMemo, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaStar, FaArrowLeft, FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import {
  useGetcreatedbusinessByUserQuery,
  useGetUserReviewQuery,
  useBusinessAnalyticsQuery,
} from "../../slices/userApiSlices";
import { useSelector } from "react-redux";
import TokenDecode from "../../Component/TokenDecode";
import Loader from "../../Component/Loader";
import Error from "../../Component/Error";
import "../../Customcss/businessDashboard.css";
import LineChartComponent from "../../Component/Admin/LineGraph";

const BusinessDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null;

  // Fetch business and review data
  const {
    data: businessData,
    isLoading: businessLoading,
    error: businessError,
  } = useGetcreatedbusinessByUserQuery(userId);
  // console.log(businessData);
  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetUserReviewQuery();

  const reviewcountByDate = {};

  businessData?.forEach((business) => {
    const date = new Date(business.createdAt).toLocaleDateString();
    reviewcountByDate[date] = (reviewcountByDate[date] || 0) + 1;
  });
  const dates = Object.keys(reviewcountByDate).sort();
  const counts = dates.map((date) => reviewcountByDate[date]);

  // Calculate total businesses, reviews, and average rating
  const totalBusinesses = businessData?.length || 0;
  const totalReviews =
    businessData?.reduce((a, b) => a + b.reviews.length, 0) || 0;

  const averageRating =
    businessData?.map((b) => b.overallRating).reduce((a, b) => a + b, 0) /
    totalBusinesses;

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };
  // Handle loading and errors
  {
    businessLoading && <Loader />;
  }

  if (businessError) {
    return <Error message={businessError} variant="danger" />;
  }

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <Container>
          <div className="d-flex justify-content-center align-items-center text-center">
            <div>
              <h1>
                <FaStar className="me-2" /> Business Dashboard
              </h1>
              <p className="mb-0">Your Business Performance at a Glance</p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <h6 className="text-muted">Total Businesses</h6>
                <h2>{totalBusinesses}</h2>
                <p className="mb-0 text-success">
                  <i className="fas fa-arrow-up me-1"></i>12% from last month
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <h6 className="text-muted">Total Reviews</h6>
                <h2>{totalReviews}</h2>
                <p className="mb-0 text-success">
                  <i className="fas fa-arrow-up me-1"></i>8% from last month
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <h6 className="text-muted">Average Rating</h6>
                <h2>{averageRating?.toFixed(1)}</h2>
                <div className="rating-stars">{renderStars(averageRating)}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Review Graph */}
        <div className="graph-container">
          <h4>Review Trends</h4>
          <LineChartComponent
            data={counts}
            labels={dates}
            grapheader="Monthly Reviews"
          />
        </div>
      </Container>
    </div>
  );
};

export default BusinessDashboard;
