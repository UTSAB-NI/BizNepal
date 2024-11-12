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

// Add styles
const styles = {
  businessCard: {
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },
  cardImage: {
    height: '200px',
    objectFit: 'cover'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem'
  },
  cardText: {
    color: '#666',
    marginBottom: '0.5rem'
  },
  button: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '0.5rem 1rem',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  }
};

export default Business;
