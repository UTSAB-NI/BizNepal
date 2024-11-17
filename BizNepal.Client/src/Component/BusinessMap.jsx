import React from "react";
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

  const openInGoogleMaps = () => {
    const business_map_url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(business_map_url, "_blank");
  };

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

  const center = { lat, lng };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14} // Adjusted zoom level for better focus
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
      <button onClick={openInGoogleMaps} style={{ marginTop: "10px" }} className="btn btn-primary">
       Get Direction
      </button>
    </div>
  );
};

export default BusinessMap;