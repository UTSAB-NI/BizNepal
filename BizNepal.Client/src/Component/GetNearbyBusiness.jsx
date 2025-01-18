import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const GetNearbyBusiness = ({ lat, lng }) => {
  const [distance, setDistance] = useState("2");
  var latitude = lat;
  var longitude = lng;
  const data = {
    latitude,
    longitude,
    distance,
  };
  console.log("Data", data);
  return (
    <div>
      <Form>
        <Form.Group controlId="formNearbyBusiness">
          <Form.Label>Get Nearby Business</Form.Label>
          <Form.Select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="">Select distance (km)</option>
            {[1, 2, 3, 4, 5].map((item) => (
              <option key={item} value={item}>
                {item} km
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
};

export default GetNearbyBusiness;
