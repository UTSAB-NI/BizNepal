import React from "react";
import Sidenavbar from "./Sidenavbar"; // The sidebar component
import { Outlet,Navigate } from "react-router-dom"; // To render child routes
import { useSelector } from "react-redux";
const AdminLayout = () => {

  const {userInfo} = useSelector(state => state.auth);


  return userInfo && userInfo.role === "Admin" ? (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidenavbar /> {/* Side Navigation Bar */}
      </div>
      <div style={styles.mainContent}>
        <Outlet /> {/* Render the main content here */}
      </div>
    </div>
  ):(

    <Navigate to="/login" />
  )
};

const styles = {
  container: {
    display: "flex", // Flexbox layout for side-by-side positioning
    height: "100vh", // Full viewport height
    width: "100%",  // Full viewport width
  },
  sidebar: {
    width: "250px", // Fixed width for the sidebar
    backgroundColor: "#333", // Sidebar background color
    color: "#fff",
  },
  mainContent: {
    flex: 1, // Takes up the remaining width
    padding: "20px", // Add padding around the content
    backgroundColor: "#f0f0f0", // Optional background color for content area
    overflowY: "auto", // Enable scrolling if content overflows
  },
};

export default AdminLayout;
