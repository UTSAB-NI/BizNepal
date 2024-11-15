import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Loader from "../../Component/Loader";
import {
  useGetbusinessQuery,
  useDeletebusinessMutation,
  useEditBusinessMutation,
  useGetAllCategoriesQuery,
} from "../../slices/userApiSlices";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

// DataTable.use(DT);

const ManageBusiness = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editbusinessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store categoryId
  const [phoneNumber, setPhoneNumber] = useState("");

  const [website, setWebsite] = useState("");

  // Fetch business data
  const { data, isLoading, isError, refetch } = useGetbusinessQuery();
  console.log("Business Data", data);
  // Delete business
  const [deletebusiness, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeletebusinessMutation();

  // Edit business
  const [editBusiness, { isLoading: isEditing }] = useEditBusinessMutation();

  // Fetch all categories
  const { data: categories } = useGetAllCategoriesQuery();
  useEffect(() => {
    if (isDeleteError) {
      setFeedback("Failed to delete business");
      setFeedbackType("danger");
    }
  }, [isDeleteError]);

  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
      const handleClick = async (event) => {
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
          const businessid = target.getAttribute("data-id");
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this business?"
          );
          if (confirmDelete) {
            try {
              const res = await deletebusiness(businessid);
              console.log(res);
              setFeedback("Business deleted successfully");
              setFeedbackType("success");
              refetch();
            } catch (error) {
              setFeedback("Failed to delete business");
              setFeedbackType("danger");
            }
          }
        }

        if (target.classList.contains("edit-btn")) {
          const businessid = target.getAttribute("data-id");
          const business = data.find((b) => b.businessId === businessid);
          console.log(business);
          handleEditClick(business);
        }
      };

      table.addEventListener("click", handleClick);
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [data, deletebusiness]);

  // Open edit modal and set initial data
  const handleEditClick = (business) => {
    setBusinessId(business.businessId);
    setBusinessName(business.businessName);
    setDescription(business.description);
    setCategoryName(business.category.categoryName);
    setCategoryId(business.category.categoryId);
    setPhoneNumber(business.phoneNumber);
    setWebsite(business.website);
    setShowEdit(true);
  };

  // Save edited business
  const handleEditBusiness = async () => {
    try {
      const res = await editBusiness({
        businessId: editbusinessId,
        businessName,
        description,
        categoryId: categoryId,
        phoneNumber,
        website,
      });

      console.log(res);
      if (res.error) {
        setFeedback("Failed to update business");
        setFeedbackType("danger");
        return;
      }
      setFeedback("Business updated successfully!");
      setFeedbackType("success");
      refetch();
      setShowEdit(false);
    } catch (error) {
      console.error("Failed to update business:", error);
      setFeedback("Failed to update business");
      setFeedbackType("danger");
    }
  };

  const columns = [
    { title: "Name", data: "businessName" },
    { title: "Description", data: "description" },
    {
      title: "Category",
      data: function (row) {
        return row.category ? row.category.categoryName : "";
      },
    },
    { title: "Phone", data: "phoneNumber" },
    {
      title: "Location",
      data: function (row) {
        return row.location ? row.location.locationId : "";
      },
    },
    { title: "Website", data: "website" },
    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `
          <button class='btn btn-primary btn-sm edit-btn' data-id=${row.businessId}>Edit</button>
          <button class='btn btn-danger btn-sm delete-btn' data-id=${row.businessId}>Delete</button>
        `;
      },
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Alert variant="danger">Failed to fetch businesses</Alert>}

      {feedback && (
        <Alert
          variant={feedbackType}
          onClose={() => setFeedback("")}
          dismissible
        >
          {feedback}
        </Alert>
      )}

      {data && (
        <DataTable
          data={data}
          columns={columns}
          options={{
            paging: true,
            searching: true,
            ordering: true,
            info: true,
          }}
        />
      )}

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
                  setCategoryName(selectedCategory.categoryName); // Store the category name for UI display
                  setCategoryId(selectedCategory.categoryId); // Store the categoryId to be sent in the request
                }}
                required
              >
                {categories &&
                  categories.map((category, index) => (
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
            {/* <div className="mb-3">
              <label className="form-label">Location ID</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div> */}
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
            {isEditing ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageBusiness;
