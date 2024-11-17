import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Alert, Form, Button } from "react-bootstrap";
import Loader from "../Component/Loader";
import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";

const GetCategory = () => {
  const { category } = useParams(); // Get category from route params
  const { data, error, isLoading } = useSearchByCategoryQuery(category); // Fetch category data

  const [categoryData, setCategoryData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [filters, setFilters] = useState({
    rating: "",
    price: "",
    location: "",
    openNow: false,
  });

  // Update categoryData when data or error changes
  useEffect(() => {
    if (data) {
      setCategoryData(data);
    }
    if (error) {
      setFeedback("An error occurred. Please try again later.");
    }
  }, [data, error]);

  // Apply filters dynamically
  const applyFilters = () => {
    const filteredData = data.filter((item) => {
      const matchesRating = filters.rating
        ? item.rating === Number(filters.rating)
        : true;
      const matchesPrice = filters.price ? item.price === filters.price : true;
      const matchesLocation = filters.location
        ? item.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesOpenNow = filters.openNow
        ? item.isOpen === filters.openNow
        : true;

      return matchesRating && matchesPrice && matchesLocation && matchesOpenNow;
    });

    setCategoryData(filteredData);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ rating: "", price: "", location: "", openNow: false });
    setCategoryData(data); // Reset to full data
  };

  return (
    <MDBContainer fluid className="category-container" style={{ marginTop: "6rem" }}>
      {isLoading && <Loader />} {/* Loader during fetch */}
      {feedback && <Alert variant="danger">{feedback}</Alert>} {/* Error Feedback */}

      <MDBRow>
        {/* Sidebar Filters */}
        <MDBCol md={3} className="border-end px-4">
          <h4 className="mb-4">Filters</h4>

          {/* Filter by Rating */}
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Filter by Price */}
          <Form.Group className="mb-3">
            <Form.Label>Price Range</Form.Label>
            <Form.Select
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            >
              <option value="">All Prices</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </Form.Select>
          </Form.Group>

          {/* Filter by Location */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city or region"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </Form.Group>

          {/* Filter by Open Now */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Open Now"
              checked={filters.openNow}
              onChange={(e) =>
                setFilters({ ...filters, openNow: e.target.checked })
              }
            />
          </Form.Group>

          {/* Buttons */}
          <Button variant="primary" className="me-2" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </MDBCol>

        {/* Main Content Area */}
        <MDBCol md={9}>
          <h2 className="text-dark mb-4">{category} Businesses</h2>
          <MDBRow>
            {categoryData.length > 0 ? (
              categoryData.map((business) => (
                <MDBCol
                  key={business.businessId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Link to={`/business/${business.businessId}`} className="text-decoration-none">
                    <MDBCard className="h-100 border border-gray-600 mx-2 hover-card">
                      <MDBCardImage
                        src={business.image}
                        alt={business.name}
                        className="img-fluid rounded-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle className="text-dark">{business.businessName}</MDBCardTitle>
                        <MDBCardText className="text-muted">
                          {business.location}
                        </MDBCardText>
                        <MDBCardText className="text-warning">
                          {business.rating} Stars
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </Link>
                </MDBCol>
              ))
            ) : (
              !isLoading && (
                <p className="text-center text-muted">No businesses found.</p>
              )
            )}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default GetCategory;