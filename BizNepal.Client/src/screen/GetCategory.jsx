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
  const {
    data: businessByCategory,
    error,
    isLoading,
  } = useSearchByCategoryQuery(category); // Fetch category data
  console.log(businessByCategory);

  const [categoryData, setCategoryData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [filters, setFilters] = useState({
    rating: "",
    location: "",
  });

  // Update categoryData when data or error changes
  useEffect(() => {
    if (businessByCategory) {
      setCategoryData(businessByCategory);
    }
    if (error) {
      setFeedback("An error occurred. Please try again later.");
    }
  }, [businessByCategory, error]);

  // Apply filters dynamically
  const applyFilters = () => {
    const filteredData = businessByCategory.filter((item) => {
      const matchesRating = filters.rating
        ? item.rating === Number(filters.rating)
        : true;

      // const matchesLocation = filters.location
      //   ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      //   : true;

      // return matchesRating  && matchesLocation;
      return matchesRating;
    });

    setCategoryData(filteredData);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ rating: "", location: "" });
    setCategoryData(businessByCategory); // Reset to full data
  };

  const openInGoogleMaps = () => {
    const lat = parseFloat(businessByCategory?.location?.latitude);
    const lng = parseFloat(businessByCategory?.location?.longitude);
    const business_map_url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(business_map_url, "_blank");
  };

  return (
    <MDBContainer
      fluid
      className="category-container"
      style={{ marginTop: "6rem" }}
    >
      {isLoading && <Loader />} {/* Loader during fetch */}
      {feedback && (
        <Alert variant="danger" onClose={() => setFeedback("")} dismissible>
          {feedback}
        </Alert>
      )}{" "}
      {/* Error Feedback */}
      <MDBRow>
        {/* Sidebar Filters */}
        <MDBCol md={3} className="border-end px-4">
          <h4 className="mb-4">Filters</h4>

          {/* Filter by Rating */}
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={filters.rating}
              onChange={(e) =>
                setFilters({ ...filters, rating: e.target.value })
              }
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Filter by Location */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city or region"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </Form.Group> */}
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
            {categoryData && categoryData.length > 0
              ? categoryData.map((business) => (
                  <MDBCol
                    key={business.businessId}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="mb-4"
                  >
                    <Link
                      to={`/business/${business.businessId}`}
                      className="text-decoration-none"
                    >
                      <MDBCard className="h-100">
                        <MDBCardImage
                          src={business.image}
                          alt={business.name}
                          className="img-fluid rounded-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <MDBCardBody>
                          <MDBCardTitle className="text-dark">
                            {business.businessName}
                          </MDBCardTitle>
                          <MDBCardText className="text-warning">
                            {(business.rating || [1, 2, 3]).map((rating) => (
                              <span
                                key={rating}
                                className={`fs-4 ${
                                  business.rating >= rating
                                    ? "text-warning"
                                    : ""
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-muted">
                              {" "}
                              {business.rating || 0}
                            </span>
                            <span className="text-muted">
                              {" "}
                              ({business.review} reviews)
                            </span>
                          </MDBCardText>
                          <MDBCardText className="text-muted">
                            {business.category.categoryName}
                          </MDBCardText>
                          {/* <MDBCardText className="text-muted">
                            {business.location}
                          </MDBCardText> */}
                          <div className="card-footer bg-white d-flex justify-content-center align-item-center">
                            <a href={business.website}>
                              <Button variant="secondary" className="rounded-0">
                                View Website
                              </Button>
                            </a>
                            <Button
                              onClick={openInGoogleMaps}
                              className="btn btn-warning mx-3"
                            >
                              Get Direction
                            </Button>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </Link>
                  </MDBCol>
                ))
              : !isLoading && (
                  <p className="text-center text-muted">No businesses found.</p>
                )}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default GetCategory;
