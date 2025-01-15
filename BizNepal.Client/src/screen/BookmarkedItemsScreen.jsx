import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Alert } from "react-bootstrap";
import Loader from "../Component/Loader";
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
    error: isBookmarkError,
    refetch: refetchBookmarks,
  } = useGetBookmarkedQuery();

  console.log("bookmarkedData", bookmarkedData);

  useEffect(() => {
    refetchBookmarks();

    if (isBookmarkError) {
      setFeedback(isBookmarkError?.data || "Failed to fetch bookmarked items.");
      setFeedbackType("danger");
    }
  }, [isBookmarkError, refetchBookmarks]);

  // API for deleting the bookmark
  const [deleteBookmarks] = useDeleteBookmarksMutation();

  // Function to handle removing a bookmark
  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const response = await deleteBookmarks(bookmarkId).unwrap(); // Delete the bookmarked item
      window.location.reload();
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
            {bookmarkedData && bookmarkedData.length > 0
              ? bookmarkedData.map((bookmark) => (
                  <Col key={bookmark.businessId} md={4} className="my-3">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Row>
                          <Col md={9}>
                            {/* Link to business page */}
                            <Link
                              to={`/business/${bookmark.businessId}`}
                              className="text-decoration-none text-dark"
                            >
                              <Card.Title>{bookmark.businessName}</Card.Title>
                              <Card.Text>
                                <Badge bg="primary">
                                  {bookmark.category || "Category"}
                                </Badge>
                              </Card.Text>
                              <Card.Text className="text-muted">
                                <span className="fas fa-map-marker-alt"></span>{" "}
                                {bookmark.address?.district ||
                                  "Unknown District"}
                                , {bookmark.address?.city || "Unknown City"}
                              </Card.Text>
                              <Card.Text className="text-muted">
                                <span className="fas fa-phone"></span>{" "}
                                {bookmark.phoneNumber || "Unknown Phone Number"}
                              </Card.Text>
                            </Link>
                          </Col>
                          <Col md={3} className="text-end">
                            {/* Delete button */}
                            <span
                              className="fa fa-trash text-danger cursor-pointer"
                              onClick={() => handleRemoveBookmark(bookmark?.id)}
                              title="Remove Bookmark"
                            ></span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : ""}
          </>
        )}
      </Row>
    </Container>
  );
};

export default BookmarkedItemsScreen;
