import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Business = ({ business }) => {
  console.log(business); // For debugging purposes

  return (
    <Container>
      <Card className="my-3 p-3 rounded">
        <Link to={`/business/${business.businessId}`}>
          <Card.Img src={business.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/business/${business.businessId}`}>
            <Card.Title as="div">
              <strong>{business.businessName}</strong>
            </Card.Title>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Business;
