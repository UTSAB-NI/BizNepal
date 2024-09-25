import React from "react";
import { Card, Button } from "react-bootstrap";

const Business = ({ business }) => {
  return (
    <Card className="business-card">
      <Card.Img variant="top" src={business.imageUrl || "/default-img.png"} />
      <Card.Body>
        <Card.Title>{business.businessName}</Card.Title>
        <Card.Text>{business.description}</Card.Text>
        <Card.Text>{business.category.categoryName}</Card.Text>

        <Button variant="primary" href={`/business/${business.businessId}`}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Business;
