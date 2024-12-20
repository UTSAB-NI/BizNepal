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
import districtofNepal from "../data/Districtofnepal";

const API_BASE_URL = "https://localhost:5000";
const GetCategory = () => {
  const { category } = useParams(); // Get category from route params
  const {
    data: businessByCategory,
    error,
    isLoading,
  } = useSearchByCategoryQuery(category); // Fetch category data

  const [categoryData, setCategoryData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [filters, setFilters] = useState({
    ratings: [], // Multiple ratings can be selected
    District: "",
    City: "",
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
      const matchesRating =
        filters.ratings.length > 0
          ? filters.ratings.some((rating) =>
              item.reviews?.some((review) => review.rating === Number(rating))
            )
          : true;

      const matchesDistrict = filters.District
        ? item.address?.district
            .toLowerCase()
            .includes(filters.District.toLowerCase())
        : true;

      const matchesCity = filters.City
        ? item.address?.city.toLowerCase().includes(filters.City.toLowerCase())
        : true;

      return matchesRating && matchesDistrict && matchesCity;
    });

    setCategoryData(filteredData);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ ratings: [], District: "", City: "" });
    setCategoryData(businessByCategory); // Reset to full data
  };

  const handleRatingChange = (rating) => {
    setFilters((prevFilters) => {
      const ratings = [...prevFilters.ratings];
      if (ratings.includes(rating)) {
        // Remove if already selected
        return { ...prevFilters, ratings: ratings.filter((r) => r !== rating) };
      } else {
        // Add if not selected
        return { ...prevFilters, ratings: [...ratings, rating] };
      }
    });
  };

  const openInGoogleMaps = (latitude, longitude) => {
    const businessMapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(businessMapUrl, "_blank");
  };

  console.log(categoryData);

  // const imageUrl = `${API_BASE_URL}${categoryData?.businessImages[0].imageUrl}`;

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
      )}
      <MDBRow>
        {/* Sidebar Filters */}
        <MDBCol md={3} className="border-end px-4">
          <h4 className="mb-4">Filters</h4>

          {/* Filter by Rating */}
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Form.Check
                key={rating}
                type="checkbox"
                id={`rating-${rating}`}
                label={`${rating} Stars`}
                value={rating}
                checked={filters.ratings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
            ))}
          </Form.Group>

          {/* Filter by District */}
          <Form.Group className="mb-3">
            <Form.Label>District</Form.Label>
            <Form.Select
              value={filters.District}
              onChange={(e) =>
                setFilters({ ...filters, District: e.target.value })
              }
            >
              <option value="">All Districts</option>
              {districtofNepal.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Filter by City */}
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={filters.City}
              onChange={(e) => setFilters({ ...filters, City: e.target.value })}
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
                          // src={business.businessImages[0]?. || ""}
                          src={`${API_BASE_URL}${business?.businessImages[0]?.imageUrl}`}
                          alt={business.businessName}
                          className="img-fluid rounded-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <MDBCardBody>
                          <MDBCardTitle className="text-dark">
                            {business.businessName}
                          </MDBCardTitle>
                          <MDBCardText className="text-warning">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map(
                              (star) => (
                                <span
                                  key={star}
                                  className={`fs-4 ${
                                    business.overallRating >= star
                                      ? "text-warning"
                                      : "text-muted"
                                  }`}
                                >
                                  ★
                                </span>
                              )
                            )}
                            <span className="text-muted">
                              {" "}
                              ({business.reviews?.length || 0} reviews)
                            </span>
                          </MDBCardText>
                          <MDBCardText className="text-muted">
                            {business.category.categoryName}
                          </MDBCardText>
                          <div className="card-footer bg-white d-flex justify-content-center align-item-center">
                            <a href={business.website}>
                              <Button variant="secondary" className="rounded-0">
                                View Website
                              </Button>
                            </a>
                            <Button
                              onClick={() =>
                                openInGoogleMaps(
                                  business.location.latitude,
                                  business.location.longitude
                                )
                              }
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
