import React, { useEffect, useState } from "react";
import Loader from "../../Component/Loader";
import {
  useGetAlluserQuery,
  useGetbusinessQuery,
  useGetAllCategoriesQuery,
} from "../../slices/userApiSlices";
import "../../Customcss/Admindashboard.css"; // Custom CSS for improved styling

import BarGraph from "../../Component/Admin/BarGraph";
import LineChartComponent from "../../Component/Admin/LineGraph";
import PieChartComponent from "../../Component/Admin/Piechart";
const AdminDashboard = () => {
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetAlluserQuery();
  const {
    data: business,
    isLoading: isBusinessLoading,
    isError: isBusinessError,
  } = useGetbusinessQuery();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isUsersError) {
      console.log("Failed to fetch users");
    }
    if (isBusinessError) {
      console.log("Failed to fetch business");
    }
    if (isCategoriesError) {
      console.log("Failed to fetch categories");
    }
  }, [users, business, categories]);

  const NoOfBusiess = business?.length;
  console.log(NoOfBusiess);
  const NoOfUsers = users?.length;
  const NoOfCategories = categories?.length;

  return (
    <div className="admin-dashboard">
      {isUsersLoading || isBusinessLoading || isCategoriesLoading ? (
        <Loader />
      ) : (
        <div className="dashboard-cards">
          <div className="row">
            {/* Total Users Card */}
            <div className="col-md-4">
              <div className="dashboard-card users-card">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{NoOfUsers}</p>
                </div>
              </div>
            </div>

            {/* Total Business Card */}
            <div className="col-md-4">
              <div className="dashboard-card business-card">
                <div className="card-body">
                  <h5 className="card-title">Total Business</h5>
                  <p className="card-text">{NoOfBusiess}</p>
                </div>
              </div>
            </div>

            {/* Total Categories Card */}
            <div className="col-md-4">
              <div className="dashboard-card categories-card">
                <div className="card-body">
                  <h5 className="card-title">Total Categories</h5>
                  <p className="card-text">{NoOfCategories}</p>
                </div>
              </div>
            </div>
          </div>

          {/* // BarGraph component */}
          <div className="row">
            <div className="col-md-6">
              <BarGraph />
            </div>

            {/* // LineGraph component */}
            <div className="col-md-6">
              <LineChartComponent data={business} />
            </div>
          </div>

          {/* // Piechart component */}
          <div className="row">
            <div className="col-md-6">
              <PieChartComponent data={business} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
