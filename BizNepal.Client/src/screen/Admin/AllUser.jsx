import React, { useEffect } from "react";
import { useState } from "react";

import {
  useGetAlluserQuery,
  useDeleteUserbyIdMutation,
} from "../../slices/userApiSlices";

import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

import Loader from "../../Component/Loader";

const AllUser = () => {
  const [userData, setUserData] = useState([]);

  // Fetch users using RTK Query
  const { data, error, isLoading } = useGetAlluserQuery();

  // Delete mutation
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserbyIdMutation();

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

    // Handle delete button click
    table.addEventListener("click", async (event) => {
      const target = event.target;

      if (target.classList.contains("delete-btn")) {
        const userId = target.getAttribute("data-id");
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
          try {
            await deleteUser(userId);
            alert("User deleted successfully!");
          } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Error deleting user.");
          }
        }
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      table.removeEventListener("click", () => {});
    };
  }, [userData, deleteUser]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>Something went wrong</div>}
      {deleteLoading && <div>Deleting user...</div>}
      {data && (
        <DataTable
          data={data}
          columns={columns}
          options={{
            responsive: true,
            paging: true,
            searching: true,
            ordering: true,
            info: true,
          }}
        />
      )}
    </div>
  );
};

export default AllUser;
