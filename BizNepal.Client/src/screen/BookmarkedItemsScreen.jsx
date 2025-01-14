import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Alert } from "react-bootstrap";
import Loader from "../Component/Loader";
import Error from "../Component/Error";
import {
  useGetBookmarkedQuery,
  useDeleteBookmarksMutation,
} from "../slices/userApiSlices";

const BookmarkedItemsScreen = () => {
  const [Feedback, setFeedback] = useState(false);
  const [FeedbackType, setFeedbackType] = useState(false);
  // API call to fetch bookmarked businesses
  const {
    data: bookmarkedData,
    isLoading: isBookmarkLoading,
    isError: isBookmarkError,
    refetch: refetchBookmarks,
  } = useGetBookmarkedQuery();

  //api for delete the bookmark
  const [deleteBookmarks] = useDeleteBookmarksMutation();

  // Function to handle removing a bookmark
  const handleRemoveBookmark = async (businessId) => {
    try {
      const response = await deleteBookmarks(businessId).unwrap(); //FIXME: Delete the bookmarked item
      console.log("response", response);
      setFeedback(response?.message || "Bookmark removed successfully.");
      setFeedbackType("success");
      refetchBookmarks();
    } catch (error) {
      setFeedback("Failed to remove bookmark.");
      setFeedbackType("danger");
    }
  };

  return (
    <Container>
      <Row>
        {/* Loader */}
        {isBookmarkLoading && (
          <Col className="text-center">
            <Loader />
          </Col>
        )}

        {/* Error */}
        {isBookmarkError && (
          <Alert
            variant={FeedbackType}
            onClose={() => setFeedback("")}
            dismissible
          >
            {Feedback}
          </Alert>
        )}

        {/* Bookmarked Items */}
        {!isBookmarkLoading && !isBookmarkError && (
          <>
            {bookmarkedData && bookmarkedData.length > 0 ? (
              bookmarkedData.map((business) => (
                <Col key={business.businessId} md={4} className="my-3">
                  <Link
                    to={`/business/${business.businessId}`}
                    className="text-decoration-none text-dark"
                  >
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Row>
                        <Col md={9}>
                          <Card.Title>{business.businessName}</Card.Title>
                          <Card.Text>
                            <Badge bg="primary">
                              {business.category?.categoryName || "Category"}
                            </Badge>
                          </Card.Text>
                          <Card.Text className="text-muted">
                            <span className="fas fa-map-marker-alt"></span>{" "}
                            {business.address?.district || "Unknown District"},{" "}
                            {business.address?.city || "Unknown City"}
                          </Card.Text>
                          <Card.Text className="text-muted">
                            <span className="fas fa-phone"></span>{" "}
                            {business.phoneNumber || "Unknown Phone Number"}
                          </Card.Text>
                        </Col>
                        <Col md={3} className="text-end">
                          <span
                            className="fa fa-trash text-danger cursor-pointer"
                            onClick={() =>
                              handleRemoveBookmark(business.businessId)
                            }
                            title="Remove Bookmark"
                          ></span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
              ))
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
