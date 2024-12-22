import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices";
import districtofNepal from "../data/Districtofnepal";
import "../Customcss/Test.css";

const initialCategories = [{ name: "No categories", active: false }];
const API_BASE_URL = "https://localhost:5000"; // Base URL for API for images

const GetCategory = () => {
  const { category } = useParams();
  const {
    data: businessByCategory,
    error,
    isLoading,
  } = useSearchByCategoryQuery(category);

  const { data: allCategoriesData } = useGetAllCategoriesQuery();

  const [categoryData, setCategoryData] = useState([]);
  const [filters, setFilters] = useState({
    ratings: [],
    District: "",
    City: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (allCategoriesData) {
      setCategories(
        allCategoriesData.map((cat) => ({
          name: cat.categoryName || "Unnamed Category",
          active: false,
        }))
      );
    }
  }, [allCategoriesData]);

  useEffect(() => {
    if (businessByCategory) {
      const filteredData = businessByCategory.filter((item) => {
        const matchesSearch = searchQuery
          ? item.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesRating =
          filters.ratings.length > 0
            ? filters.ratings.some((rating) =>
                item.reviews?.some((review) => review.rating === Number(rating))
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

        return matchesSearch && matchesRating && matchesDistrict && matchesCity;
      });

      setCategoryData(filteredData);
    }
    if (error) {
      setFeedback("An error occurred. Please try again later.");
    }
  }, [businessByCategory, filters, searchQuery, error]);

  const clearFilters = () => {
    setFilters({ ratings: [], District: "", City: "" });
    setSearchQuery("");
    if (businessByCategory) setCategoryData(businessByCategory);
  };

  const toggleCategory = (index) => {
    const updatedCategories = categories.map((cat, i) => ({
      ...cat,
      active: i === index ? !cat.active : cat.active,
    }));
    setCategories(updatedCategories);
  };

  const toggleRating = (rating) => {
    setFilters((prevFilters) => {
      const updatedRatings = prevFilters.ratings.includes(rating)
        ? prevFilters.ratings.filter((r) => r !== rating)
        : [...prevFilters.ratings, rating];
      return { ...prevFilters, ratings: updatedRatings };
    });
  };

  const renderCategoriesButton = () => {
    return categories?.map((category, index) => (
      <Badge
        key={index}
        bg={category.active ? "primary" : "light"}
        onClick={() => toggleCategory(index)}
        className="category-badges"
      >
        {category.name || "Unnamed Category"}
      </Badge>
    ));
  };

  // Render businesses based on the category selected and filters applied
  const renderBusinesses = () => {
    if (isLoading) {
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

    if (!categoryData || categoryData.length === 0) {
      return <p className="text-center text-muted">No businesses found.</p>;
    }

    return categoryData.map((business, index) => (
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
          <Link to={`/business/${business.businessId}`}>
            <Button variant="outline-primary">View Details</Button>
          </Link>
          <Button variant="outline-secondary">Bookmark</Button>
        </div>
      </Card>
    ));
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
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={filters.City}
                onChange={(e) =>
                  setFilters({ ...filters, City: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex flex-wrap">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Badge
                    key={rating}
                    bg={
                      filters.ratings.includes(rating) ? "primary" : "warning"
                    }
                    onClick={() => toggleRating(rating)}
                    className="me-2 text-light m-1 pe-auto"
                  >
                    {rating} Star
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Button variant="danger" className="mt-3" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Card>
        </Col>

        <Col md={9} className="business-section">
          <h2 className="mb-4">{category} Businesses</h2>
          <div className="d-flex flex-wrap">{renderBusinesses()}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default GetCategory;
