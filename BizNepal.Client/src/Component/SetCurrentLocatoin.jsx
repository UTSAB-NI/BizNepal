import React from "react";
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { setLocation } from "../slices/getlocationSclies";

const SetCurrentLocatoin = () => {
  const [mylocation, SetMyLocation] = useState("");
    const [Feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          SetMyLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console(`Error: ${error.message}`);
        }
      );
    } else {
      setFeedback("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []); //Fetch location on component mount

  useEffect(() => {
    dispatch(setLocation(mylocation));
  }, [mylocation, dispatch]);

  return (
    <div>
        <small>{Feedback}</small>
    </div>
  )
};

export default SetCurrentLocatoin;
