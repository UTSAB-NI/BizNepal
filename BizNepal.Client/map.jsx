import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetbusinessByIdQuery } from "../slices/userApiSlices";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const BusinessMap = () => {
  const businessId = useParams()?.id;
  const {
    data: businessdata,
    isLoading: businessLoading,
    isError: businessError,
  } = useGetbusinessByIdQuery(businessId);

  // Extract latitude and longitude
  const lat = parseFloat(businessdata?.location?.latitude);
  const lng = parseFloat(businessdata?.location?.longitude);

  console.log("Latitude:", lat);
  console.log("Longitude:", lng);

  const center = { lat, lng };

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD1RO9GfOjORh4culViEC-2ZZbakdvc7Gk", // Use environment variable
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  // Display loading or error states
  if (businessLoading) {
    return <div>Loading business data...</div>;
  }

  if (businessError) {
    return <div>Error loading business data.</div>;
  }

  if (isNaN(lat) || isNaN(lng)) {
    return <div>Invalid location data</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14} // Adjusted zoom level for better focus
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div>Loading Google Map...</div>
  );
};

export default BusinessMap;