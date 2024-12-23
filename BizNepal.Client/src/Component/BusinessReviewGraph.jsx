import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa"; // Adding star icons for better visualization

const BusinessReviewGraph = ({ reviews }) => {
  // Count the number of reviews for each rating (1 to 5)
  const ratingCounts = Array(5)
    .fill(0)
    .map((_, index) => {
      const rating = index + 1;
      return {
        rating,
        count: reviews.filter((review) => review.rating === rating).length,
      };
    });

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border rounded shadow">
          <p className="label">
            <FaStar className="text-warning me-1" />
            {`${payload[0].value} review${payload[0].value !== 1 ? "s" : ""}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="my-4 p-3">
      <h4 className="mb-4">
        <FaStar className="text-warning me-2" />
        Review Graph
      </h4>
      <Row>
        <Col>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ratingCounts}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="rating"
                tickFormatter={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
                interval={0}
              />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  );
};

export default BusinessReviewGraph;