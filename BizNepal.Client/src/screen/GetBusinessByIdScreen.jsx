import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  Container,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetbusinessByIdQuery } from "../slices/userApiSlices";

import Loader from "../Component/Loader";
import CreateReview from "../Component/CreateReview";
import BusinessMap from "../Component/BusinessMap";
import BusinessReviewGraph from "../Component/BusinessReviewGraph";
import Carousel from "react-bootstrap/Carousel";
import { data } from "autoprefixer";

const API_BASE_URL = "https://localhost:5000";
const GetBusinessByIdScreen = () => {
  const [Feedback, setFeedback] = useState(false);
  const { id: businessid } = useParams();
  const {
    data: businessdatabyid,
    isLoading,
    isError,
  } = useGetbusinessByIdQuery(businessid);
  console.log(businessdatabyid?.businessImages);

  useEffect(() => {
    if (isError) {
      setFeedback(
        businessdatabyid?.message || "An error occurred. Please try again later"
      );
    }
  }, [isError, businessdatabyid]);

  const imageUrl = `${API_BASE_URL}${businessdatabyid?.businessImages[0].imageUrl}`;
  console.log(imageUrl);
  // console.log(businessdatabyid.businessImages);

  return (
    <Container className="business-container">
      {isLoading && <Loader />}
      {Feedback && (
        <Alert variant="danger" onClose={() => setFeedback("")} dismissible>
          {Feedback}
        </Alert>
      )}
      {businessdatabyid && (
        <>
          {/* Left Section: Business Images and Overview */}
          <Row>
            <Col md={12}>
              <Image
                src={imageUrl}
                alt="image"
                style={{ height: "400px", objectFit: "cover" }}
              />
            </Col>
          </Row>

          {/* Map Section */}
          <Row>
            <Col md={6}>
              <Card
                className="my-4 p-3 d-flex justify-content-center align-item-center"
                style={{ width: "fit-content" }}
              >
                <BusinessMap
                  latitude={businessdatabyid.location.latitude}
                  longitude={businessdatabyid.location.longitude}
                />
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p className="text-muted">Location</p>
                      <Card.Title>
                        <h4>{businessdatabyid.address.district}</h4>
                      </Card.Title>
                      <Card.Text>{businessdatabyid.address.city}</Card.Text>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant="secondary"
                        className="mt-3"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps?q=${businessdatabyid.location.latitude},${businessdatabyid.location.longitude}`,
                            "_blank"
                          )
                        }
                      >
                        View on Google Maps
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <h2>About Business</h2>
              <p>{businessdatabyid.description}</p>
            </Col>

            <Col md={6} className="d-flex justify-content-center">
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="bg-warning"
                  style={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                >
                  <h3>{businessdatabyid.businessName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>
                    Business Type: {businessdatabyid.category.categoryName}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <i className="fas fa-phone"></i>
                    </Col>
                    <Col md={6}>
                      <p className="fs-5">
                        {businessdatabyid.phoneNumber
                          ? businessdatabyid.phoneNumber
                          : "Not Available"}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <i className="fas fa-link"></i>
                    </Col>
                    <Col md={6}>
                      <a
                        href={businessdatabyid.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>{businessdatabyid.website}</p>
                      </a>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Reviews and Graph */}
          <Row>
            <Col md={6}>
              <CreateReview businessId={businessdatabyid.businessId} />
            </Col>
            <Col md={6}>
              <BusinessReviewGraph reviews={businessdatabyid.reviews} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default GetBusinessByIdScreen;
