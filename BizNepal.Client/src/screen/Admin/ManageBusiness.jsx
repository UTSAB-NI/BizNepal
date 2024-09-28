import React from "react";
import Loader from "../../Component/Loader";
import { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";

import { useGetbusinessQuery } from "../../slices/userApiSlices";

import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

// DataTable.use(DT);

const ManageBusiness = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const { data, isLoading, isError } = useGetbusinessQuery();
  console.log(data);

  const columns = [
    { title: "Name", data: "businessName" },
    { title: "Description", data: "description" },
    { title: "Category", data: "category" },
    { title: "Phone", data: "phoneNumber" },
    { title: "Location", data: "location.locationId" },
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
      {isError && <Alert variant="danger">Failed to fetch business</Alert>}

      {
        <Alert
          variant={feedbackType}
          onClose={() => setFeedback("")}
          dismissible
          show={feedback}
        >
          {feedback}
        </Alert>
      }

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
    </>
  );
};

export default ManageBusiness;
