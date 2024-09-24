import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Modal, Dropdown } from "react-bootstrap";

import {
  useGetAlluserQuery,
  useDeleteUserbyIdMutation,
  useAddUserbyadminMutation,
} from "../../slices/userApiSlices";

import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

DataTable.use(DT);

import Loader from "../../Component/Loader";

const AllUser = () => {
  const [userData, setUserData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Fetch users using RTK Query
  const { data, error, isLoading, refetch } = useGetAlluserQuery();

  // Delete mutation
  const [deleteUser, { isLoading: deleteLoading }] =
    useDeleteUserbyIdMutation();

  //add user
  const [addUserbyadmin, { isLoading: addUserLoading }] =
    useAddUserbyadminMutation();

  const handleSaveUser = async () => {
    if (!username || !email || !password || !role) {
      setFeedback("Please fill all required fields");
      setFeedbackType("danger");
      return;
    }

    try {
      await addUserbyadmin({
        username,
        email,
        password,
        role,
      });
      setFeedback("User added successfully!");
      setFeedbackType("success");
      refetch();
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      setShow(false);
    } catch (error) {
      console.error("Failed to add user:", error);
      setFeedback("Failed to add user");
      setFeedbackType("danger");
    }
  };

  // Columns for DataTable
  const columns = [
    { title: "Username", data: "userName" },
    { title: "Email", data: "email" },
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

  // Attach event listeners to the dynamically created buttons
  useEffect(() => {
    const table = document.querySelector("table");
    console.log("table", table);

    // Only attach the event listener if the table exists
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
      };

      table.addEventListener("click", handleClick);

      // Clean up the event listener when the component unmounts
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [userData, deleteUser]);

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
              onClick={() => setShow(true)}
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
                searchPlaceholder: "Search users...", // Placeholder for the search box
                lengthMenu: "Show _MENU_ entries",
              },
            }}
            className="table table-striped table-bordered"
          />

          <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
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
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
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
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-user-tag"></i>
                    </span>
                    <select
                      className="form-select"
                      id="role"
                      aria-label="User Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">General User</option>
                      <option value="business">Business Owner</option>
                    </select>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUser}>
                {addUserLoading ? "Adding user..." : "Save"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AllUser;
