import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategorybyadminMutation,
  useEditCategorybyadminMutation, // Assuming you have this mutation
} from "../../slices/userApiSlices";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Loader from "../../Component/Loader";

DataTable.use(DT);

const ManageCategory = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch users using RTK Query
  const { data, error, isLoading, refetch } = useGetAllCategoriesQuery();
  console.log(data);

  // // Delete mutation
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  // Add user mutation
  const [addCategory, { isLoading: addUserLoading }] =
    useAddCategorybyadminMutation();

  // Edit user mutation
  const [editCategory, { isLoading: editUserLoading }] =
    useEditCategorybyadminMutation();

  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
      const handleClick = async (event) => {
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
          const categoryId = target.getAttribute("data-id");

          const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
          );
          if (confirmDelete) {
            try {
              // Make sure to convert categoryId to a string if necessary
              await deleteCategory(categoryId);
              setFeedback("Category deleted successfully");
              setFeedbackType("success");
              refetch();
            } catch (error) {
              console.error("Failed to delete category:", error);
              setFeedback("Failed to delete category");
              setFeedbackType("danger");
            }
          }
        }

        if (target.classList.contains("edit-btn")) {
          const categoryId = target.getAttribute("data-id");
          const category = data.find((u) => u.categoryId === categoryId); // Ensure this is still correct based on your data structure
          handleEditClick(category);
        }
      };

      table.addEventListener("click", handleClick);
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [data, deleteCategory]);

  //add category
  const handleSaveCategory = async () => {
    if (!categoryName) {
      setFeedback("Please fill all required fields");
      setFeedbackType("danger");
      return;
    }

    try {
      await addCategory({ categoryName });
      setFeedback("User added successfully!");
      setFeedbackType("success");
      setShowAddCategory(false);
      refetch();
      resetForm();
    } catch (error) {
      console.error("Failed to add category:", error);
      setFeedback("Failed to add user");
      setFeedbackType("danger");
    }
  };

  //edit user
  const handleEditCategory = async () => {
    // Check if all required fields are filled
    if (!categoryName) {
      setFeedback("Please fill all required fields");
      setFeedbackType("danger");
      return;
    }

    try {
      // Call the edit user mutation
      await editCategory({ categoryId: selectedCategoryId, categoryName });
      setFeedback("Category updated successfully!");
      setFeedbackType("success");
      setShowEditCategory(false);
      refetch();
    } catch (error) {
      console.error("Failed to update caetgory:", error);
      setFeedback("Failed to update user");
      setFeedbackType("danger");
    }
  };

  const resetForm = () => {
    setCategoryName(""); // Reset password visibility
  };

  //when edit is clicked set old data
  const handleEditClick = (category) => {
    setSelectedCategoryId(category.categoryId);
    setCategoryName(category.categoryName);
    setShowEditCategory(true);
  };

  const columns = [
    { title: "Category Name", data: "categoryName" },

    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `
          <button class='btn btn-primary btn-sm edit-btn' data-id=${row.categoryId}>Edit</button>
          <button class='btn btn-danger btn-sm delete-btn' data-id=${row.categoryId}>Delete</button>
        `;
      },
    },
  ];

  useEffect(() => {
    if (error) {
      setFeedback("Failed to fetch Category");
      setFeedbackType("danger");
    }
  }, [error]);
  return (
    <div>
      {isLoading && <Loader />}
      {feedback && (
        <Alert
          variant={feedbackType}
          dismissible
          onClose={() => setFeedback("")}
        >
          {feedback}
        </Alert>
      )}
      {data && (
        <>
          <div className="button-container d-flex justify-content-end">
            <Button
              variant="btn btn-success"
              onClick={() => {
                // Reset form data
                setShowAddCategory(true);
              }}
              className="my-3"
            >
              Add Category
            </Button>
          </div>

          <DataTable
            data={data}
            columns={columns}
            options={{
              responsive: true,
              paging: true,
              searching: true,
              ordering: true,
              info: true,
              language: {
                searchPlaceholder: "Search category...",
                lengthMenu: "Show _MENU_ entries",
              },
            }}
            className="table table-striped table-bordered"
          />
          <Modal
            show={showAddCategory}
            onHide={() => setShowAddCategory(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Enter categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddCategory(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveCategory}>
                {addUserLoading ? "Adding Category..." : "Save"}
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showEditCategory}
            onHide={() => setShowEditCategory(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Enter category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditCategory(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditCategory}>
                {editUserLoading ? "Updating Category..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ManageCategory;
