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

  const {
    data: bookmarkedData,
    isLoading: isBookmarkLoading,
    error: isBookmarkError,
    refetch: refetchBookmarks,
  } = useGetBookmarkedQuery();

  useEffect(() => {
    refetchBookmarks();

    if (isBookmarkError) {
      setFeedback(isBookmarkError?.data || "Failed to fetch bookmarked items.");
      setFeedbackType("danger");
    }
  }, [isBookmarkError, bookmarkedData, refetchBookmarks]);

  const [deleteBookmarks] = useDeleteBookmarksMutation();

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const response = await deleteBookmarks(bookmarkId).unwrap();
      window.location.reload();
      setFeedback(response?.message || "Bookmark removed successfully.");
      setFeedbackType("success");
      refetchBookmarks();
    } catch (error) {
      setFeedback("Failed to remove bookmark.");
      setFeedbackType("danger");
    }
  };

  return (
    // Added min-height to ensure content fills viewport
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main content wrapper with flex-grow */}
      <div style={{ flex: "1 0 auto" }}>
        <Container>
          <Row>
            {isBookmarkLoading && (
              <Col className="text-center">
                <Loader />
              </Col>
            )}

            {isBookmarkError && (
              <Alert
                variant={FeedbackType}
                onClose={() => setFeedback("")}
                dismissible
                className="my-3"
              >
                {Feedback}
              </Alert>
            )}

            {!isBookmarkLoading && !isBookmarkError && (
              <>
                {bookmarkedData && bookmarkedData.length > 0 ? (
                  bookmarkedData.map((bookmark) => (
                    <Col key={bookmark.businessId} md={4} className="my-3">
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Row>
                            <Col md={9}>
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
                                  {bookmark.phoneNumber ||
                                    "Unknown Phone Number"}
                                </Card.Text>
                              </Link>
                            </Col>
                            <Col md={3} className="text-end">
                              <span
                                className="fa fa-trash text-danger cursor-pointer"
                                onClick={() =>
                                  handleRemoveBookmark(bookmark?.id)
                                }
                                title="Remove Bookmark"
                              ></span>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col className="text-center py-5">
                    <p>No bookmarked items found.</p>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Container>
      </div>
      {/* Footer will now stick to bottom */}
    </div>
  );
};

export default BookmarkedItemsScreen;
