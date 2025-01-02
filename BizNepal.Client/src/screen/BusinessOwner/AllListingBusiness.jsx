import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetbusinessQuery,
  useGetcreatedbusinessByUserQuery,
} from "../../slices/userApiSlices";
import { useSelector } from "react-redux";
import TokenDecode from "../../Component/TokenDecode";
import "../../Customcss/alllistingbusiness.css"; // Import the CSS file for styling

const AllListingBusiness = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null;

  const {
    data: business,
    error,
    isLoading,
  } = useGetcreatedbusinessByUserQuery(userId);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Get unique categories from the business data
  const categories = [
    "All Categories",
    ...new Set(business?.map((b) => b.category.categoryName)),
  ];

  // Filter businesses based on search term and selected category
  const filteredBusinesses = business?.filter((b) => {
    const matchesSearch = b.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      b.category.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalbusinessreview = business?.map((business) => business?.reviews);
  console.log("totalbusinessreview", totalbusinessreview);
  return (
    <div>
      {/* Dashboard Header */}
      <div className="businesslisting-header">
        <div className="container">
          <h1>
            <i className="fas fa-store me-2"></i>My Business Listings
          </h1>
          <p className="mb-0">Manage your registered businesses</p>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stats-box bg-primary bg-opacity-10">
              <h3>{business.length}</h3>
              <p className="mb-0">Total Listings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-box bg-success bg-opacity-10">
              <h3>{business.length}</h3>
              <p className="mb-0">Active Listings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-box bg-warning bg-opacity-10">
              <h3>{totalbusinessreview[0].length}</h3>
              <p className="mb-0">Review</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-box bg-danger bg-opacity-10">
              <h3>2</h3>
              <p className="mb-0">Inactive</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <Link to="/businesslist">
              <button className="btn btn-primary w-100">
                <i className="fas fa-plus me-2"></i>Add New
              </button>
            </Link>
          </div>
        </div>

        {/* Business Listings */}
        <div className="row">
          {filteredBusinesses?.map((business) => (
            <div className="col-md-6 mb-4" key={business.businessId}>
              <Link to={`/business/particularreview/${business.businessId}`}>
                <div className="card business-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title">{business.businessName}</h5>
                        <p className="text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {business.address.city}, {business.address.district}
                        </p>
                        <span
                          className={`badge bg-${getCategoryColor(
                            business.category.categoryName
                          )}`}
                        >
                          {business.category.categoryName}
                        </span>
                        <p className="mt-2 mb-0">
                          <i
                            className={`fas fa-circle ${getStatusColor(
                              business.overallRating
                            )} me-2`}
                          ></i>
                          {getStatusText(business.overallRating)}
                        </p>
                      </div>
                      <div>
                        <button
                          className="action-btn btn btn-light"
                          title="Edit"
                        >
                          <i className="fas fa-edit text-primary"></i>
                        </button>
                        <button
                          className="action-btn btn btn-light"
                          title="Delete"
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row text-center">
                      <div className="col-4">
                        <h6>Views</h6>
                        <p className="mb-0">1,234</p>
                      </div>
                      <div className="col-4">
                        <h6>Reviews</h6>
                        <p className="mb-0">{business.reviews.length}</p>
                      </div>
                      <div className="col-4">
                        <h6>Rating</h6>
                        <p className="mb-0">
                          {business.overallRating || "N/A"} ⭐
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getCategoryColor = (category) => {
  switch (category) {
    case "Restaurant":
      return "success";
    case "Services":
      return "info";
    default:
      return "primary";
  }
};

const getStatusColor = (rating) => {
  if (rating === null) return "text-warning";
  if (rating >= 4) return "text-success";
  if (rating >= 2) return "text-warning";
  return "text-danger";
};

const getStatusText = (rating) => {
  if (rating === null) return "Pending Review";
  if (rating >= 4) return "Active";
  if (rating >= 2) return "Needs Improvement";
  return "Inactive";
};

export default AllListingBusiness;
