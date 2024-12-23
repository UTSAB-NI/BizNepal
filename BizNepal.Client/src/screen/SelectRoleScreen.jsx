import React, { useState } from "react";
import "../Customcss/selectrolescreen.css"; // Custom styles

const RoleCard = ({ icon, title, description, onClick }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card role-card h-100">
        <div className="card-body text-center">
          <div className="role-icon mb-3">{icon}</div>
          <h2 className="role-title">{title}</h2>
          <p className="role-description">{description}</p>
          <button className="btn btn-primary select-btn" onClick={onClick}>
            Continue as {title}
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectRoleScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    console.log(`Selected Role: ${role}`);
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
        <RoleCard
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="var(--primary)"
              width="80"
              height="80"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          }
          title="General User"
          description="Browse businesses, read reviews, and discover local services in Nepal."
          onClick={() => handleRoleSelection("GeneralUser")}
        />

        <RoleCard
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="var(--primary)"
              width="80"
              height="80"
            >
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
          }
          title="Business Owner"
          description="List your business, manage your profile, and connect with potential customers."
          onClick={() => handleRoleSelection("BusinessOwner")}
        />

        {/* <RoleCard
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="var(--primary)"
              width="80"
              height="80"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          }
          title="Admin"
          description="Manage users, moderate content, and maintain platform integrity."
          onClick={() => handleRoleSelection("admin")}
        /> */}
      </div>
    </div>
  );
};

export default SelectRoleScreen;
