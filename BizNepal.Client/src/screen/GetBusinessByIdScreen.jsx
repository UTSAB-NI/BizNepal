import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetbusinessByIdQuery } from "../slices/userApiSlices";

import Loader from "../Component/Loader";

const GetBusinessByIdScreen = () => {
  const [Feedback, setFeedback] = useState(false);
  const businessid = useParams();
  console.log(businessid.id);
  const {
    data: businessdatabyid,
    isLoading,
    iserror,
  } = useGetbusinessByIdQuery(businessid.id);

  useEffect(() => {
    if (iserror) {
      setFeedback(data?.message || "An error occurred. Please try again later");
    }
  }, [iserror]);

  // console.log(businessdatabyid);
  return (
    <div>
      {isLoading && <Loader />}
      {Feedback && (
        <Alert variant="danger" onClose={() => setFeedback("")} dismissible>
          {Feedback}
        </Alert>
      )}

      {businessdatabyid && (
        <div>
          <div>{businessdatabyid.businessName}</div>
        </div>
      )}
    </div>
  );
};

export default GetBusinessByIdScreen;
