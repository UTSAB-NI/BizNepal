import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://localhost:5000";
const SearchBusiness = ({ business }) => {
  return (
    <Card className="mb-3 business-card shadow">
      <Link
        to={`/business/${business.businessId}`}
        className="text-decoration-none"
      >
        <Card.Img
          variant="top"
          src={`${API_BASE_URL}${business?.businessImages[0]?.imageUrl}`}
          alt={business.businessName}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <h5 className="mb-2">
            {business.businessName || "Unknown Business"}
          </h5>
          <Badge bg="info" className="mb-3">
            {business.category?.categoryName || "Unknown Category"}
          </Badge>
          <p>{business.address?.city || "Unknown City"}</p>
          <div className="d-flex flex-wrap">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <span
                key={star}
                className={`fs-4 ${
                  business.overallRating >= star ? "text-warning" : "text-muted"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-muted">
              {" "}
              ({business.reviews?.length || 0} reviews)
            </span>
          </div>
        </Card.Body>
      </Link>
      <div className="d-flex justify-content-between m-3">
        <Link to={`/business/${business.businessId}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default SearchBusiness;
