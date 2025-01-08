import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import Loader from "../Component/Loader";
import Error from "../Component/Error";
import { useGetbusinessByIdQuery } from "../slices/userApiSlices";

const API_BASE_URL = "https://localhost:5000"; // Base URL for API for images

const BookmarkedItemsScreen = () => {
  const bookmarkedItems = localStorage.getItem("bookmark");
  console.log(bookmarkedItems); // Parse bookmarked items from localStorage

  // Parse bookmarked items from localStorage

  const {
    data: businessData,
    error,
    isLoading,
  } = useGetbusinessByIdQuery(bookmarkedItems);

  console.log(businessData); // Debugging

  const handleRemoveBookmark = () => {
    localStorage.removeItem("bookmark");
    window.location.reload(); // Refresh the page to reflect changes
  };
  return (
    <Container>
      <Row>
        {isLoading && (
          <Col className="text-center">
            <Loader />
          </Col>
        )}

        {error && (
          <Col>
            <Error message={error} variant="danger" />
          </Col>
        )}

        {!isLoading && !error && (
          <>
            {businessData ? (
              <Col key={businessData.businessId} md={4} className="my-3">
                <Card className="h-100 shadow-sm">
                  <Link
                    to={`/business/${businessData.businessId}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Body>
                      <Row>
                        <Col md={9}>
                          <Card.Title>{businessData.businessName}</Card.Title>
                          <Card.Text>
                            <Badge bg="primary" className="badge">
                              {businessData.category?.categoryName}
                            </Badge>
                          </Card.Text>

                          <Card.Text className="text-muted">
                            <span className="fas fa-map-marker-alt"></span>{" "}
                            {businessData.address?.district ||
                              "Unknown District"}{" "}
                            , {businessData.address?.city || "Unknown City"}
                          </Card.Text>
                          <Card.Text className="text-muted">
                            <span className="fas fa-phone"></span>{" "}
                            {businessData.phoneNumber || "Unknown Phone Number"}
                          </Card.Text>
                        </Col>
                        <Col md={3}>
                          <span
                            className="fa fa-trash text-danger cursor-pointer"
                            onClick={handleRemoveBookmark}
                            title="Remove Bookmark"
                          ></span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ) : (
              <Col>
                <Alert variant="info">No bookmarked items found.</Alert>
              </Col>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default BookmarkedItemsScreen;
