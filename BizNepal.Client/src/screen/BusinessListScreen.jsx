import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../slices/getlocationSclies";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import "../Customcss/BusinessList.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const BusinessListScreen = () => {
  const [mylocation, SetMyLocation] = useState(null);
  const [Feedback, setFeedback] = useState("");
  const { location } = useSelector((state) => state.currentlocation);
  const dispatch = useDispatch();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          SetMyLocation(newLocation);
          dispatch(setLocation(newLocation)); // Dispatching location to Redux
        },
        (error) => {
          setFeedback(`Error: ${error.message}`);
        }
      );
    } else {
      setFeedback("Geolocation is not supported by this browser.");
    }
  };

  //map intergration
  const apiKey = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      if (mylocation) {
        bounds.extend(
          new window.google.maps.LatLng(mylocation.lat, mylocation.long)
        );
      }
      map.fitBounds(bounds);
      setMap(map);
    },
    [mylocation]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return isLoaded ? (
    <div>
      {Feedback && (
        <Alert variant="danger" onClose={() => setFeedback("")} dismissible>
          {Feedback}
        </Alert>
      )}

      <Container>
        <h3 className="my-3">Enter Your Business Details Here</h3>
        <Row>
          <Col md="9" className="my-4">
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md="6">
                  <Form.Group controlId="businessname">
                    <Form.Label>Business Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Business Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Description"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="website">
                    <Form.Label>Website </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Website"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Phone </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group controlId="latitude">
                    <Form.Label>Latitude </Form.Label>
                    <Form.Control
                      type="text"
                      value={location.lat}
                      placeholder="Enter Latitude"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="longitude">
                    <Form.Label>Longitude </Form.Label>
                    <Form.Control
                      type="text"
                      value={location.long}
                      placeholder="Enter Longitude"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="categoryName">
                    <Form.Label>Category Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Category Name"
                      required
                    />
                  </Form.Group>

                  <Button
                    onClick={fetchLocation}
                    variant="outline-primary"
                    className="my-3"
                  >
                    Get Current Location
                  </Button>
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="my-3">
                Submit
              </Button>
            </Form>
          </Col>

          <Col md="3" className="businesslist-right-col">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mylocation}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            ></GoogleMap>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <></>
  );
};

export default BusinessListScreen;
