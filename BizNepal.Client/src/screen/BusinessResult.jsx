import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Form,
  Pagination,
} from "react-bootstrap";
import {
  useGetbusinessQuery,
  useGetAllCategoriesQuery,
} from "../slices/userApiSlices";
import districtofNepal from "../data/Districtofnepal";
import "../Customcss/Test.css";
import Loader from "../Component/Loader";

const API_BASE_URL = "https://localhost:5000";

const BusinessResult = () => {
  const { category: categoryParam } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const querySearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState({
    ratings: "",
    search: querySearch,
    district: "",
    category: categoryParam || "",
    latitude: "",
    longitude: "",
    radiusInKm: "",
  });
  console.log("Filters", filters);
  const [feedback, setFeedback] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [shouldSendLocation, setShouldSendLocation] = useState(false); // New state to control location sending

  // Fetch user's location on component mount but don't use it until the user searches
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFilters((prevFilters) => ({
            ...prevFilters,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          setFeedback(
            "Unable to fetch your location. Please enable location access."
          );
        }
      );
    } else {
      setFeedback("Geolocation is not supported by your browser.");
    }
  }, []);

  // API query, only send location if shouldSendLocation is true
  const {
    data: paginatedBusinessData,
    error,
    isLoading,
    refetch,
  } = useGetbusinessQuery({
    category: filters.category,
    searchTerm: filters.search,
    pageSize,
    pageNumber,
    isAscending: true,
    latitude: shouldSendLocation ? filters.latitude : "",
    longitude: shouldSendLocation ? filters.longitude : "",
    radiusInKm: filters.radiusInKm,
    district: filters.District,
    ratings: filters.ratings,
  });
  console.log("Data", paginatedBusinessData);
  const { data: categoryData } = useGetAllCategoriesQuery();
  const submitFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setShouldSendLocation(true); // Enable sending location
    refetch(); // Manually trigger the API query
  };
  const toggleRating = (rating) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ratings: prevFilters.ratings === String(rating) ? "" : String(rating),
    }));
  };
  const clearFilters = () => {
    setFilters({
      ratings: "",
      District: "",
      category: "",
      latitude: "",
      longitude: "",
      radiusInKm: "",
      search: "",
    });
    setPageNumber(1);
    setShouldSendLocation(false); // Disable sending location
    refetch();
  };

  const renderBusinesses = () => {
    if (isLoading || loading) {
      return (
        <div className="text-center my-5">
          {/* <Spinner animation="border" variant="primary" /> */}
          <Loader />
          <p>Loading businesses...</p>
        </div>
      );
    }

    if (error || feedback) {
      return (
        <Alert variant="danger" onClose={() => setFeedback("")}>
          {feedback || "Something went wrong."}
        </Alert>
      );
    }

    // if (!BusinessData || BusinessData.length === 0) {
    //   return <p className="text-center text-muted">No businesses found.</p>;
    // }

    return paginatedBusinessData?.items?.map((business, index) => (
      <Card className="mb-3 business-card shadow" key={index}>
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
            <p>{business.address?.district || "Unknown City"}</p>
            <div className="d-flex flex-wrap">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
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
              ))}
              <span className="text-muted">
                {" "}
                ({business.reviews?.length || 0} reviews)
              </span>
            </div>
          </Card.Body>
        </Link>
      </Card>
    ));
  };
  const renderPagination = () => {
    const totalItems = paginatedBusinessData?.totalCount || 0;
    const totalPages =
      paginatedBusinessData?.totalPage || Math.ceil(totalItems / pageSize);

    if (totalPages <= 1 || totalItems === 0) {
      return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="d-flex flex-column align-items-center mt-4">
        <Pagination className="mb-3">
          <Pagination.Prev
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          />
          {pageNumbers.map((page) => (
            <Pagination.Item
              key={page}
              active={page === pageNumber}
              onClick={() => setPageNumber(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={pageNumber === totalPages}
          />
        </Pagination>
      </div>
    );
  };

  return (
    <Container fluid className="category-page">
      <Row className="mt-3">
        <Col md={3} className="filter-section">
          <Card className="filter-card shadow">
            <h3 className="m-3 filter-head">Filter Businesses</h3>

            <Form.Group>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search businesses..."
                value={filters.search}
                onChange={submitFilters}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>District</Form.Label>
              <Form.Select
                name="District"
                value={filters.District}
                onChange={submitFilters}
              >
                <option value="">All Districts</option>
                {districtofNepal.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category}
                onChange={submitFilters}
              >
                <option value="">All Categories</option>
                {categoryData?.map((category, index) => (
                  <option key={index} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Distance (km)</Form.Label>
              <Form.Control
                type="number"
                name="radiusInKm"
                placeholder="Enter distance"
                value={filters.radiusInKm}
                onChange={submitFilters}
                min={1}
                max={5}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex flex-wrap">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Badge
                    key={rating}
                    bg={filters.ratings === String(rating) ? "primary" : ""}
                    onClick={() => toggleRating(rating)}
                    className={`me-2 m-1 pe-auto cursor-pointer border ${
                      filters.ratings === String(rating)
                        ? "text-white"
                        : "text-dark"
                    }`}
                  >
                    {rating} Star
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="danger" className="mt-3" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Card>
        </Col>

        <Col md={9} className="business-section">
          <div className="d-flex flex-wrap">{renderBusinesses()}</div>
          {renderPagination()}
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessResult;
