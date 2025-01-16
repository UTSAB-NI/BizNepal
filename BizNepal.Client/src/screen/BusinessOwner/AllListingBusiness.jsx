import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useGetbusinessByIdQuery,
  useGetcreatedbusinessByUserQuery,
  useEditBusinessMutation,
} from "../../slices/userApiSlices";
import { useSelector } from "react-redux";
import TokenDecode from "../../Component/TokenDecode";
import "../../Customcss/alllistingbusiness.css"; // Import the CSS file for styling
import { Alert, Button, Modal } from "react-bootstrap";
import Loader from "../../Component/Loader";
import Error from "../../Component/Error";

const AllListingBusiness = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null;

  const [showEdit, setShowEdit] = useState(false);
  const [editbusinessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store categoryId
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    data: business,
    error: businessError,
    isLoading: businessLoading,
    refetch,
  } = useGetcreatedbusinessByUserQuery(userId);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter businesses based on search term
  const filteredBusinesses = business?.filter((b) => {
    const matchesSearch = b.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalbusinessreview = business?.map(
    (business) => business?.reviews || []
  );
  const totalReviews =
    totalbusinessreview?.reduce((acc, curr) => acc + curr.length, 0) || 0;

  // Fetch business by ID
  const {
    data: businessById,
    error: businessByIdError,
    isLoading: businessByIdLoading,
  } = useGetbusinessByIdQuery(editbusinessId);

  // Update modal fields when businessById data changes
  useEffect(() => {
    if (businessById) {
      setBusinessName(businessById.businessName);
      setDescription(businessById.description);
      setCategoryName(businessById.category.categoryName);
      setCategoryId(businessById.category.categoryId);
      setPhoneNumber(businessById.phoneNumber);
      setWebsite(businessById.website);
    }
  }, [businessById]);

  // Edit business
  const handleEditClick = async (businessId) => {
    setBusinessId(businessId); // Set the businessId to fetch data
    setShowEdit(true); // Show the modal
  };

  const [editBusiness] = useEditBusinessMutation();
  const handleEditBusiness = async () => {
    try {
      // Simulate edit operation
      const response = await editBusiness({
        businessId: editbusinessId,
        businessName,
        description,
        categoryId,
        phoneNumber,
        website,
      });

      console.log(response);
      setFeedbackType("success");
      setFeedback("Business updated successfully!");
      refetch();
    } catch (error) {
      setFeedbackType("danger");
      setFeedback("Failed to update business. Please try again.");
    } finally {
      setShowEdit(false);
    }
  };

  // Placeholder for categories (replace with actual data)
  const categories = [
    { categoryId: 1, categoryName: "Restaurant" },
    { categoryId: 2, categoryName: "Services" },
  ];

  return (
    <div>
      {businessLoading && <Loader />}
      {businessError && <Error variant="danger" message={businessError} />}

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
              <h3>{business?.length || 0}</h3>
              <p className="mb-0">Total Listings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-box bg-success bg-opacity-10">
              <h3>{business?.length || 0}</h3>
              <p className="mb-0">Active Listings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-box bg-warning bg-opacity-10">
              <h3>{totalReviews}</h3>
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
              <div className="card business-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Link
                        to={`/business/particularreview/${business.businessId}`}
                        className="text-decoration-none"
                      >
                        <h5 className="card-title">{business.businessName}</h5>
                      </Link>
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
                    </div>
                    <div>
                      <button
                        className="action-btn btn btn-light"
                        title="Edit"
                        onClick={() => handleEditClick(business.businessId)}
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
            </div>
          ))}
        </div>
      </div>

      {/* Edit Business Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Business</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-control"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryName}
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (category) => category.categoryName === e.target.value
                  );
                  setCategoryName(selectedCategory.categoryName);
                  setCategoryId(selectedCategory.categoryId);
                }}
                required
              >
                {categories.map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Website</label>
              <input
                type="url"
                className="form-control"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditBusiness}>
            {businessByIdLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
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

export default AllListingBusiness;
