import React, { useState } from "react";
import "../Customcss/selectrolescreen.css"; // Custom styles
import { useRegisterMutation } from "../slices/userApiSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "General User",
    description:
      "Browse businesses, read reviews, and discover local services in Nepal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="var(--primary)" width="80" height="80">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    value: "GeneralUser",
  },
  {
    title: "Business Owner",
    description:
      "List your business, manage your profile, and connect with potential customers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="var(--primary)" width="80" height="80">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
    value: "BusinessOwner",
  },
];

const RoleCard = ({ icon, title, description, onClick, isLoading }) => (
  <div className="col-md-4 mb-4">
    <div className="card role-card h-100">
      <div className="card-body text-center">
        <div className="role-icon mb-3">{icon}</div>
        <h2 className="role-title">{title}</h2>
        <p className="role-description">{description}</p>
        <button
          className="btn btn-primary select-btn"
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Continue as ${title}`}
        </button>
      </div>
    </div>
  </div>
);

const SelectRoleScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const previousLocalState = JSON.parse(localStorage.getItem("data"));
  const { username, email, password } = previousLocalState || {};


  const handleSubmit = async (role) => {
    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const response = await register({
        userName: username,
        email,
        password,
        role,
      }).unwrap();
      toast.success(response.message);
      localStorage.removeItem("data");
      navigate("/login");
    } catch (error) {
      setFeedback(
        error.data?.message ||
          JSON.stringify(error?.data) ||
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container role-container">
      <div className="role-header text-center mb-5">
        <h1>Select Your Role</h1>
        <p>
          Choose the role that best describes you to get started with BizNepal
        </p>
      </div>

      <div className="row role-cards justify-content-center">
        {roles.map((role) => (
          <RoleCard
            key={role.value}
            icon={role.icon}
            title={role.title}
            description={role.description}
            onClick={() => handleSubmit(role.value)}
            isLoading={isLoading}
          />
        ))}
      </div>

      {feedback && <div className="alert alert-danger mt-3 text-center">{feedback}</div>}
    </div>
  );
};

export default SelectRoleScreen;
