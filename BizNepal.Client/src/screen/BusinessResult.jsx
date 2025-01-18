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
import GetNearbyBusiness from "../Component/GetNearbyBusiness";
import "../Customcss/Test.css";

const API_BASE_URL = "https://localhost:5000";

const BusinessResult = () => {
  const { category: categoryParam } = useParams(); // Renamed to avoid conflict with state
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const querySearch = searchParams.get("search") || "";

  const [BusinessData, setBusinessData] = useState([]); // To store the final filtered data
  const [filters, setFilters] = useState({
    ratings: [],
    District: "",
    City: "",
    category: categoryParam || "", // Add category to filters
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [loading, setLoading] = useState(false); // Loading state
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null }); // Store user's location
  const [distance, setDistance] = useState(""); // Distance filter

  // Request user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
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

  console.log("userLat", userLocation.lat);
  console.log("userLng", userLocation.lng);

  // Call useGetbusinessQuery with updated query parameters
  const {
    data: paginatedBusinessData,
    error,
    isLoading,
    refetch, // Function to manually refetch data
  } = useGetbusinessQuery({
    category: filters.category || "", // Use category from filters
    searchTerm: querySearch || "",
    pageSize,
    pageNumber,
    isAscending: true,
    latitude: userLocation.lat, // Add latitude
    longitude: userLocation.lng, // Add longitude
    radiusInKm: distance || "", // Add distance
  });

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (paginatedBusinessData && paginatedBusinessData.items) {
      const filteredData = paginatedBusinessData.items.filter((item) => {
        const matchesSearch = searchQuery
          ? item.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesRating =
          filters.ratings.length > 0
            ? filters.ratings.some(
                (rating) => Math.floor(item.overallRating) === Number(rating)
              )
            : true;

        const matchesDistrict = filters.District
          ? item.address?.district
              ?.toLowerCase()
              .includes(filters.District.toLowerCase())
          : true;

        const matchesCity = filters.City
          ? item.address?.city
              ?.toLowerCase()
              .includes(filters.City.toLowerCase())
          : true;

        const matchesCategory = filters.category
          ? item.category?.categoryName
              ?.toLowerCase()
              .includes(filters.category.toLowerCase())
          : true;

        return (
          matchesSearch &&
          matchesRating &&
          matchesDistrict &&
          matchesCity &&
          matchesCategory
        );
      });
      setBusinessData(filteredData);
      setLoading(false); // Stop loading once filtering is done
    }
  }, [paginatedBusinessData, filters, searchQuery]);

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPageNumber(1); // Reset to page 1 when page size changes
  };

  // Handle page number change
  const handlePageNumberChange = (page) => {
    setPageNumber(page);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ ratings: [], District: "", City: "", category: "" });
    setSearchQuery("");
    setDistance("");
    setPageNumber(1);
  };

  // Toggle rating filter
  const toggleRating = (rating) => {
    setFilters((prevFilters) => {
      const updatedRatings = prevFilters.ratings.includes(rating)
        ? prevFilters.ratings.filter((r) => r !== rating)
        : [...prevFilters.ratings, rating];
      return { ...prevFilters, ratings: updatedRatings };
    });
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  // Handle distance filter change
  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  // Handle manual API call
  const handleSearch = () => {
    refetch(); // Manually refetch data with updated query parameters
  };

  // Render businesses
  const renderBusinesses = () => {
    if (isLoading || loading) {
      return (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading businesses...</p>
        </div>
      );
    }

    if (error || feedback) {
      return (
        <Alert variant="danger">{feedback || "Something went wrong."}</Alert>
      );
    }

    if (!BusinessData || BusinessData.length === 0) {
      return <p className="text-center text-muted">No businesses found.</p>;
    }

    return BusinessData.map((business, index) => (
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
            <p>{business.address?.city || "Unknown City"}</p>
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
        <div className="d-flex justify-content-between m-3">
          <Link to={`/business/${business.businessId}`}></Link>
        </div>
      </Card>
    ));
  };

  // Render pagination with page size dropdown
  const renderPagination = () => {
    const totalItems = paginatedBusinessData?.totalCount || 0;
    const totalPages =
      paginatedBusinessData?.totalPage || Math.ceil(totalItems / pageSize);

    // Do not render pagination if there's only one page or no data
    if (totalPages <= 1 || totalItems === 0) {
      return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="d-flex flex-column align-items-center mt-4">
        {/* Pagination Controls */}
        <Pagination className="mb-3">
          <Pagination.Prev
            onClick={() => handlePageNumberChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          />
          {pageNumbers.map((page) => (
            <Pagination.Item
              key={page}
              active={page === pageNumber}
              onClick={() => handlePageNumberChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageNumberChange(pageNumber + 1)}
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
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
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

            <Form.Group className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={handleCategoryChange}
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
                placeholder="Enter distance"
                value={distance}
                onChange={handleDistanceChange}
                min={1}
                max={5}
              />
            </Form.Group>

            {/* Pass user's location to GetNearbyBusiness */}
            {/* <GetNearbyBusiness lat={userLocation.lat} lng={userLocation.lng} /> */}

            <Form.Group className="mt-3">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex flex-wrap">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Badge
                    key={rating}
                    bg={filters.ratings.includes(rating) ? "primary" : ""}
                    onClick={() => toggleRating(rating)}
                    className={`me-2 m-1 pe-auto cursor-pointer border ${
                      filters.ratings.includes(rating)
                        ? "text-white"
                        : "text-dark"
                    }`}
                  >
                    {rating} Star
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Button variant="danger" className="mt-3" onClick={clearFilters}>
              Clear Filters
            </Button>

            {/* Button to manually trigger API call */}
            <Button variant="primary" className="mt-3" onClick={handleSearch}>
              Search
            </Button>
          </Card>
        </Col>

        {/* rendering business data  */}
        <Col md={9} className="business-section">
          <h2 className="mb-4">
            {filters.category || querySearch
              ? `${filters.category || "All"} Businesses`
              : "Businesses"}
          </h2>
          <div className="d-flex flex-wrap">{renderBusinesses()}</div>
          {renderPagination()}
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessResult;
