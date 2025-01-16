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
  } = useGetbusinessQuery({
    pageSize: 1000, // You can choose any page size here
    pageNumber: 1, // Assuming you're loading all businesses at once
    isAscending: true,
  });
  console.log(business);
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

  const NoOfBusiess = business?.items?.length;
  // console.log(NoOfBusiess);
  const NoOfUsers = users?.length;
  const NoOfCategories = categories?.length;

  //this data for line graph
  //group business by date
  const businessCountByDate = {};

  business?.items?.forEach((business) => {
    const date = new Date(business.createdAt).toLocaleDateString();
    businessCountByDate[date] = (businessCountByDate[date] || 0) + 1;
  });

  //store the date and count in separate arrays
  const dates = Object.keys(businessCountByDate).sort();
  const counts = dates.map((date) => businessCountByDate[date]);

  //data for pie chart
  const businessByCategory = {};

  business?.items?.forEach((business) => {
    const category = business.category.categoryName;
    businessByCategory[category] = (businessByCategory[category] || 0) + 1;
  });

  //Extract Category names and counts
  const Business_categories = Object.values(businessByCategory);
  const Business_counts = Object.keys(businessByCategory);

  //users data for line graph
  //group users by date
  const userCountByDate = {};

  users?.forEach((user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    userCountByDate[date] = (userCountByDate[date] || 0) + 1;
  });

  //store the date and count in separate arrays
  const users_dates = Object.keys(userCountByDate).sort();
  console.log(users_dates);
  const noof_users = users_dates.map((date) => userCountByDate[date]);

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

            {/* // LineGraph component for business */}
            <div className="col-md-6">
              <h2>Business Created Per day</h2>
              <LineChartComponent
                data={counts}
                labels={dates}
                grapheader="Business created per day"
              />
            </div>
          </div>

          {/* // Piechart component */}
          <div className="row">
            <div className="col-md-6">
              <h2>Businesses by Category</h2>
              <PieChartComponent
                data={Business_categories}
                labels={Business_counts}
              />
            </div>
            {/* // LineGraph component for users */}
            <div className="col-md-6">
              <h2>User Created Per day</h2>
              <LineChartComponent
                data={noof_users}
                labels={users_dates}
                grapheader="User created per day"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
