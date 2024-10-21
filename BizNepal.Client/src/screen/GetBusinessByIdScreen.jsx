import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetbusinessByIdQuery } from "../slices/userApiSlices";

import Loader from "../Component/Loader";

const GetBusinessByIdScreen = () => {
  const [Feedback, setFeedback] = useState(false);
  const businessid = useParams();
  const { data, isLoading, iserror } = useGetbusinessByIdQuery(businessid.id);

  useEffect(() => {
    if (iserror) {
      setFeedback(data?.message);
    }
  }, [iserror]);

  console.log(data);
  return (
    <div>
      {isLoading && <Loader />}
      {Feedback && <div>{Feedback}</div>}

      {data && (
        <div>
          <div>{data.businessName}</div>
        </div>
      )}
    </div>
  );
};

export default GetBusinessByIdScreen;
