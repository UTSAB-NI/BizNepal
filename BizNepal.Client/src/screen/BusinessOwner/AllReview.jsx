import React from "react";
import { useGetUserReviewQuery } from "../../slices/userApiSlices";
const AllReview = () => {
  const { data: userReview, error, isLoading } = useGetUserReviewQuery();
  console.log("userReview", userReview);
  return <div>
    {
        userReview?.map((review) => {
            return <div key={review.id}>
            <h1>{review.comment}</h1>
            <p>{review.rating}</p>
            </div>;
        })

    }
  </div>;
};

export default AllReview;
