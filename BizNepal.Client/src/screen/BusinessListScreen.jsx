// Desc: BusinessListScreen component to add business details
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../slices/getlocationSclies";
import GoogleMapReact from "google-map-react";

import { useListbusinessMutation } from "../slices/userApiSlices";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices";

import "../Customcss/BusinessList.css";

const MyLocationMarker = ({ text }) => (
  <div>
    <i
      className="fas fa-map-marker-alt"
      style={{ color: "red", fontSize: "24px" }}
    ></i>
    <p>{text}</p>
  </div>
);

const BusinessListScreen = () => {
  const [myLocation, SetMyLocation] = useState({ lat: 27.7172, lng: 85.324 });
  const [businessName, setBusinessname] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store categoryId

  const [Feedback, setFeedback] = useState("");
  const [FeedbackType, setFeedbackType] = useState("");
  const [images, setImages] = useState([]);

  //getting location from redux
  const { location } = useSelector((state) => state.currentlocation);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //navigation
  const navigate = useNavigate();

  // Fetching listbusiness mutation
  const [
    listbusiness,
    { error: businesslisterror, isLoading: businessLoading },
  ] = useListbusinessMutation(); // Fetching listbusiness mutation

  //getting all categories
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();
  const fetchLocation = () => {
    // Fetching current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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

  const handleImageChange = (e) => {
    setImages(e.target.files); // Store the selected images
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("description", description);
    formData.append("website", website);
    if (phoneNumber.length !== 10) {
      setFeedback("Phone number should be 10 digits");
      setFeedbackType("danger");
      return; // Stop form submission if the phone number is invalid
    } else {
      formData.append("phoneNumber", phoneNumber);
    }

    formData.append("latitude", location?.lat.toString());
    formData.append("longitude", location?.lng.toString());
    formData.append("categoryId", categoryId);

    // Append images
    Array.from(images).forEach((image) => {
      formData.append("Images", image);
    });

    console.log("Form Data", formData);
    console.log(categoryId);

    try {
      const response = await listbusiness(formData).unwrap();
      console.log("Response", response);

      if (response.message) {
        setFeedback("Business Added Successfully");
        setFeedbackType("success");
        navigate("/");
      } else {
        setFeedback("Unexpected response from server");
        setFeedbackType("warning");
      }
    } catch (error) {
      setFeedback(error?.data?.message || "Failed to add business");
      setFeedbackType("danger");
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    // Handling map click
    SetMyLocation({ lat, lng });
    dispatch(setLocation({ lat, lng }));
  };

  return (
    <div>
      {Feedback && (
        <Alert
          variant={FeedbackType}
          onClose={() => setFeedback("")}
          dismissible
        >
          {Feedback}
        </Alert>
      )}

      <Container>
        <h3 className="my-3">Enter Your Business Details Here</h3>
        <Row>
          <Col md="6" className="my-4">
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md="6">
                  <Form.Group controlId="businessname">
                    <Form.Label>Business Name </Form.Label>
                    <Form.Control
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessname(e.target.value)}
                      placeholder="Enter Business Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Description"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="website">
                    <Form.Label>Website </Form.Label>
                    <Form.Control
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Enter Website"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Phone </Form.Label>
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={location?.lat || ""}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="Enter Latitude"
                      readOnly
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="longitude">
                    <Form.Label>Longitude </Form.Label>
                    <Form.Control
                      type="text"
                      value={location?.lng || ""}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="Enter Longitude"
                      readOnly
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="categoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      as="select"
                      value={categoryName}
                      onChange={(e) => {
                        const selectedCategory = categories.find(
                          (category) => category.categoryName === e.target.value
                        );
                        setCategoryName(selectedCategory.categoryName); // Store the category name for UI display
                        setCategoryId(selectedCategory.categoryId); // Store the categoryId to be sent in the request
                      }}
                      required
                    >
                      {
                        // Display categories from the API
                        categories?.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>

                  {/* Image Upload */}
                  <Form.Group controlId="images">
                    <Form.Label>Upload Business Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="my-3">
                {businessLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add Business"
                )}
              </Button>
            </Form>
          </Col>

          <Col md="6" className="businesslist-right-col">
            <Button
              onClick={fetchLocation}
              variant="outline-primary"
              className="my-3"
            >
              Get Current Location
            </Button>
            <div style={{ height: "400px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyD1RO9GfOjORh4culViEC-2ZZbakdvc7Gk",
                }} // Replace with your API key
                center={myLocation}
                zoom={11}
                onClick={handleMapClick}
              >
                <MyLocationMarker
                  lat={myLocation.lat}
                  lng={myLocation.lng}
                  text="Selected Location"
                />
              </GoogleMapReact>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BusinessListScreen;
