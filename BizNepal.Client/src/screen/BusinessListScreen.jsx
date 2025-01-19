// Desc: BusinessListScreen component to add business details
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../slices/getlocationSclies";
import GoogleMapReact from "google-map-react";
import { useListbusinessMutation } from "../slices/userApiSlices";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices";
import districtofNepal from "../data/Districtofnepal";

import "../Customcss/Businesslist.css";

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
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
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

    if (!location?.lat || !location?.lng) {
      setFeedback("Please set the location on the map.");
      setFeedbackType("danger");
      return;
    }

    if (phoneNumber.length !== 10) {
      setFeedback("Phone number should be 10 digits.");
      setFeedbackType("danger");
      return;
    }

    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("website", website || "None");
    formData.append("phoneNumber", phoneNumber);
    formData.append("latitude", location.lat.toString());
    formData.append("longitude", location.lng.toString());
    formData.append("categoryId", categoryId);

    Array.from(images).forEach((image) => {
      formData.append("Images", image);
    });

    const clearForm = () => {
      setBusinessname("");
      setCity("");
      setDistrict("");
      setDescription("");
      setWebsite("");
      setPhone("");
      setCategoryName("");
      setCategoryId("");
      setImages([]);
    };
    // Debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await listbusiness(formData).unwrap();
      if (response?.message) {
        setFeedback("Business Added Successfully");
        setFeedbackType("success");
        clearForm();
      } else {
        setFeedback("Unexpected response from server.");
        setFeedbackType("warning");
      }
    } catch (error) {
      setFeedback(error?.data?.message || "Failed to add business.");
      setFeedbackType("danger");
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    // Handling map click
    if (lat && lng) {
      SetMyLocation({ lat, lng });
      dispatch(setLocation({ lat, lng }));
    }
  };
  return (
    <div className="businesslist">
      <div className="header">
        <h1>
          <i className="fas fa-store"></i> Add Your Business
        </h1>
        <p>List your business in our directory and reach more customers</p>
      </div>

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

                  <Form.Group controlId="businessdistrict">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      as="select"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select a District
                      </option>
                      {districtofNepal &&
                        districtofNepal.map((district, index) => {
                          return (
                            <>
                              <option value={district} key={index}>
                                {district}
                              </option>
                            </>
                          );
                        })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="businesscity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      placeholder="Enter the city of business "
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
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
                      value={website || ""}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Enter Website"
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
                  <Form.Group controlId="latitude" style={{ display: "none" }}>
                    <Form.Label>Latitude </Form.Label>
                    <Form.Control
                      type="text"
                      value={location?.lat || ""}
                      // onChange={(e) => setLatitude(e.target.value)}
                      placeholder="Enter Latitude"
                      readOnly
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="longitude" style={{ display: "none" }}>
                    <Form.Label>Longitude </Form.Label>
                    <Form.Control
                      type="text"
                      value={location?.lng || ""}
                      // onChange={(e) => setLongitude(e.target.value)}
                      placeholder="Enter Longitude"
                      readOnly
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="categoryName">
                    <Form.Label>Category Name</Form.Label>
                    {isLoading ? (
                      <p>Loading categories...</p>
                    ) : isError ? (
                      <p>Failed to load categories.</p>
                    ) : (
                      <Form.Control
                        as="select"
                        value={categoryName}
                        onChange={(e) => {
                          const selectedCategory = categories.find(
                            (category) =>
                              category.categoryName === e.target.value
                          );
                          if (selectedCategory) {
                            setCategoryName(selectedCategory.categoryName); // Store the category name for UI display
                            setCategoryId(selectedCategory.categoryId); // Store the categoryId to be sent in the request
                          }
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select a Category
                        </option>
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
                    )}
                  </Form.Group>

                  {/* Image Upload */}
                  <Form.Group controlId="images">
                    <Form.Label>Upload Business Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="file-input"
                      placeholder="Upload Business Images"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="success" className="my-3">
                {businessLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add Business"
                )}
              </Button>
            </Form>
          </Col>

          <Col md="6" className="businesslist-right-col map-section">
            <Button
              onClick={fetchLocation}
              variant="outline-primary"
              className="my-3 location-btn"
            >
              <i className="fas fa-location-arrow"></i> Get Current Location
            </Button>
            <div
              style={{ height: "400px", width: "100%" }}
              className="map-container"
            >
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
