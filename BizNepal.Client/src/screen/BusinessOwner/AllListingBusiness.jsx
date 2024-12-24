import React from "react";
import { useGetbusinessQuery } from "../../slices/userApiSlices";
const AllListingBusiness = () => {
  const { data: business, error, isLoading } = useGetbusinessQuery();
  return (
    <div>
      {business?.map((business) => {
        return (
          <div key={business.id}>
            <h1>{business.businessName}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AllListingBusiness;
