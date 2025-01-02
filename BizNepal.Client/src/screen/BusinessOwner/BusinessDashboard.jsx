import React, { useEffect, useRef, useMemo } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaStar, FaArrowLeft, FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import {
  useGetcreatedbusinessByUserQuery,
  useGetUserReviewQuery,
} from "../../slices/userApiSlices";
import { useSelector } from "react-redux";
import TokenDecode from "../../Component/TokenDecode";
import "../../Customcss/businessDashboard.css";
import LineChartComponent from "../../Component/Admin/LineGraph";

// Register Chart.js components
Chart.register(...registerables);

const API_BASE_URL = "https://localhost:5000"; // for image URL in localhost 5000 port number

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
  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetUserReviewQuery();

  // Calculate review counts by date
  const reviewCounts = useMemo(() => {
    const counts = {};
    businessData?.reviews?.forEach((review) => {
      const date = new Date(review.createdAt).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return counts;
  }, [businessData]);

  const reviewDates = useMemo(
    () => Object.keys(reviewCounts).sort(),
    [reviewCounts]
  );
  const reviewCountsArray = useMemo(
    () => reviewDates.map((date) => reviewCounts[date]),
    [reviewDates, reviewCounts]
  );

  // Calculate total businesses, reviews, and average rating
  const totalBusinesses = businessData?.length || 0;
  const totalReviews =
    businessData?.reduce((a, b) => a + b.reviews.length, 0) || 0;

  const averageRating =
    businessData?.map((b) => b.overallRating).reduce((a, b) => a + b, 0) /
    totalBusinesses;
  console.log(businessData);
  console.log(averageRating);

  // Sentiment analysis (example data)
  const sentimentData = {
    positive: 75,
    neutral: 15,
    negative: 10,
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  // Refs for Chart.js canvases
  const reviewChartRef = useRef(null);
  const sentimentChartRef = useRef(null);

  // Initialize charts
  useEffect(() => {
    if (!businessLoading && !reviewLoading) {
      // Destroy existing charts to avoid memory leaks
      if (reviewChartRef.current) reviewChartRef.current.destroy();
      if (sentimentChartRef.current) sentimentChartRef.current.destroy();

      // Review Trends Chart
      const reviewCtx = document.getElementById("reviewChart").getContext("2d");
      reviewChartRef.current = new Chart(reviewCtx, {
        type: "line",
        data: {
          labels: reviewDates,
          datasets: [
            {
              label: "Monthly Reviews",
              data: reviewCountsArray,
              borderColor: "#4a90e2",
              tension: 0.3,
              fill: true,
              backgroundColor: "rgba(74, 144, 226, 0.1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Sentiment Analysis Chart
      const sentimentCtx = document
        .getElementById("sentimentChart")
        .getContext("2d");
      sentimentChartRef.current = new Chart(sentimentCtx, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              data: [
                sentimentData.positive,
                sentimentData.neutral,
                sentimentData.negative,
              ],
              backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
  }, [businessLoading, reviewLoading, reviewDates, reviewCountsArray]);

  // Handle loading and errors
  if (businessLoading || reviewLoading) return <div>Loading...</div>;
  if (businessError || reviewError)
    return <div>Error: {businessError?.message || reviewError?.message}</div>;

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
        <div className="graph-container mt-3">
          <h4>Review Trends</h4>
          <canvas id="reviewChart"></canvas>
          <LineChartComponent
            data={reviewCountsArray}
            labels={reviewDates}
            grapheader="Monthly Reviews"
          />
        </div>

        {/* Sentiment Analysis Section */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <h4>Sentiment Analysis</h4>
                <div className="d-flex mb-3">
                  <span className="sentiment-badge sentiment-positive">
                    <FaSmile className="me-2" />
                    {sentimentData.positive}% Positive
                  </span>
                  <span className="sentiment-badge sentiment-neutral">
                    <FaMeh className="me-2" />
                    {sentimentData.neutral}% Neutral
                  </span>
                  <span className="sentiment-badge sentiment-negative">
                    <FaFrown className="me-2" />
                    {sentimentData.negative}% Negative
                  </span>
                </div>
                <canvas id="sentimentChart"></canvas>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BusinessDashboard;
