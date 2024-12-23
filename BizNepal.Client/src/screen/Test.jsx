import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices";
import districtofNepal from "../data/Districtofnepal";
import "../Customcss/Test.css";

const API_BASE_URL = "https://localhost:5000";

const initialCategories = [{ name: "No categories", active: false }];

const BusinessFilters = () => {
  const { category } = useParams();
  const {
    data: businessByCategory,
    error,
    isLoading,
  } = useSearchByCategoryQuery(category);

  const { data: allcategoriesData } = useGetAllCategoriesQuery();

  const [categoryData, setCategoryData] = useState([]);
  const [filters, setFilters] = useState({
    ratings: [],
    District: "",
    City: "",
  });

  const [rating, setRating] = useState(3);
  const [categories, setCategories] = useState(initialCategories);
  const [feedback, setFeedback] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize categories when data is fetched
  useEffect(() => {
    if (allcategoriesData) {
      setCategories(
        allcategoriesData.map((cat) => ({
          name: cat.categoryName,
          active: false,
        }))
      );
    }
  }, [allcategoriesData]);

  // Update categoryData when business data or filters change
  useEffect(() => {
    if (businessByCategory) {
      const filteredData = businessByCategory.filter((item) => {
        const matchesSearch = searchQuery
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

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
          ? item.address?.city
              .toLowerCase()
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

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRating(value);
    setFilters((prevFilters) => ({ ...prevFilters, ratings: [value] }));
  };

  const toggleCategory = (index) => {
    const updatedCategories = categories.map((cat, i) => {
      return { ...cat, active: i === index ? !cat.active : cat.active };
    });
    setCategories(updatedCategories);
  };

  const renderCategoriesButton = () => {
    return categories.map((category, index) => (
      <Button
        key={index}
        variant={category.active ? "primary" : "outline-primary"}
        onClick={() => toggleCategory(index)}
        className="category-badges"
      >
        {category.name}
      </Button>
    ));
  };

  const FilterResult = () => {
    if (isLoading) return <p>Loading businesses...</p>;
    if (!categoryData || categoryData.length === 0) {
      return <p>No businesses found</p>;
    }
    return categoryData.map((business, index) => (
      <Card className="mb-3" key={index}>
        <Card.Body className="d-flex">
          <div className="me-3">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16l4-4-4-4M8 12h8"></path>
            </svg>
          </div>
          <div>
            <h6 className="mb-1">{business.name}</h6>
            <span className="badge bg-secondary mb-2">{business.category}</span>
            <div>{business.address.city}</div>
            <div className="d-flex flex-wrap my-2">
              {business.reviews.map((review, index) => (
                <Badge key={index} bg="primary" className="me-2">
                  {review.rating} stars
                </Badge>
              ))}
            </div>
            <Button variant="primary" className="me-2">
              View Details
            </Button>
            <Button variant="secondary">Bookmark</Button>
          </div>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <Card className="filter-card">
            <h3 className="m-3 filter-head">Filter Businesses</h3>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search business here....."
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
                placeholder="Enter the City of district"
                value={filters.City}
                onChange={(e) =>
                  setFilters({ ...filters, City: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Range
                min={1}
                max={5}
                value={rating}
                onChange={handleRatingChange}
              />
              <p>
                Showing businesses rated{" "}
                <b className="text-warning">{rating}+</b> stars
              </p>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Categories</Form.Label>
              <div className="category-badges-section">
                {renderCategoriesButton()}
              </div>
            </Form.Group>
            <Button variant="danger" className="mt-3" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Card>
        </Col>

        <Col md={8}>
          <h3 className="m-3 filter-head">Filter Results</h3>
          <FilterResult />
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessFilters;
