import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  useGetAlluserQuery,
  useDeleteUserbyIdMutation,
  useAddUserbyadminMutation,
  useEditUserbyadminMutation, // Assuming you have this mutation
} from "../../slices/userApiSlices";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Loader from "../../Component/Loader";

DataTable.use(DT);

const AllUser = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch users using RTK Query
  const { data, error, isLoading, refetch } = useGetAlluserQuery();
  console.log(data);

  // Delete mutation
  const [deleteUser, { isLoading: deleteLoading }] =
    useDeleteUserbyIdMutation();

  // Add user mutation
  const [addUserbyadmin, { isLoading: addUserLoading }] =
    useAddUserbyadminMutation();

  // Edit user mutation
  const [editUserbyadmin, { isLoading: editUserLoading }] =
    useEditUserbyadminMutation();

  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
      const handleClick = async (event) => {
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
          const userId = target.getAttribute("data-id");
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
          );
          if (confirmDelete) {
            try {
              await deleteUser(userId);
              setFeedback("User deleted successfully");
              setFeedbackType("success");
              refetch();
            } catch (error) {
              console.error("Failed to delete user:", error);
              setFeedback("Failed to delete user");
              setFeedbackType("danger");
            }
          }
        }

        if (target.classList.contains("edit-btn")) {
          const userId = target.getAttribute("data-id");
          const user = data.find((u) => u.id === userId); // Assuming data is the user array
          handleEditClick(user);
        }
      };

      table.addEventListener("click", handleClick);
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [data, deleteUser]);

  // save user
  const handleSaveUser = async () => {
    if (!username || !email || !password || !role) {
      setFeedback("Please fill all required fields");
      setFeedbackType("danger");
      return;
    }

    try {
      await addUserbyadmin({ username, email, password, role });
      setFeedback("User added successfully!");
      setFeedbackType("success");
      refetch();
      resetForm();
      setShowAdd(false);
    } catch (error) {
      console.error("Failed to add user:", error);
      setFeedback("Failed to add user");
      setFeedbackType("danger");
    }
  };

  //edit user
  const handleEditUser = async () => {
    // Check if all required fields are filled
    if (!username || !email || !role) {
      setFeedback("Please fill all required fields");
      setFeedbackType("danger");
      return;
    }

    try {
      // Call the edit user mutation
      await editUserbyadmin({ id: selectedUserId, username, email, role });
      setFeedback("User updated successfully!");
      setFeedbackType("success");
      refetch();

      setShowEdit(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      setFeedback("Failed to update user");
      setFeedbackType("danger");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("");
    setShowPassword(false); // Reset password visibility
  };

  //when edit is clicked set old data
  const handleEditClick = (user) => {
    setSelectedUserId(user.id);
    setUsername(user.userName);
    setEmail(user.email);
    setRole(user.roles[0]); // Access the first role from the roles array
    setShowEdit(true);
  };

  const columns = [
    { title: "Username", data: "userName" },
    { title: "Email", data: "email" },
    { title: "Role", data: "roles" },
    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `
          <button class='btn btn-primary btn-sm edit-btn' data-id=${row.id}>Edit</button>
          <button class='btn btn-danger btn-sm delete-btn' data-id=${row.id}>Delete</button>
        `;
      },
    },
  ];

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>Something went wrong</div>}
      {deleteLoading && <div>Deleting user...</div>}
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
                resetForm();
                // Reset form data
                setShowAdd(true);
              }}
              className="my-3"
            >
              Add User
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
                searchPlaceholder: "Search users...",
                lengthMenu: "Show _MENU_ entries",
              },
            }}
            className="table table-striped table-bordered"
          />

          {/* Add User Modal */}
          <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"} // Change input type based on state
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="position-absolute"
                    style={{
                      right: "10px",
                      top: "35px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Toggle icon based on state */}
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="GeneralUser">General User</option>
                    <option value="BusinessOwner">Business Owner</option>
                  </select>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUser}>
                {addUserLoading ? "Adding user..." : "Save"}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit User Modal */}
          <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="GeneralUser">General User</option>
                    <option value="BusinessOwner">Business Owner</option>
                  </select>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditUser}>
                {editUserLoading ? "Updating user..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AllUser;
