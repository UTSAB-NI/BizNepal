import React from "react";
import "../Customcss/categoryCard.css"; // Custom CSS for styling
import { LuImageMinus } from "react-icons/lu";

const API_BASE_URL = "https://localhost:5000";
const CategoryCard = ({ iconPath, categoryName }) => {
  //   console.log(iconPath);

  const imageUrl = `${API_BASE_URL}${iconPath}`;
  console.log(imageUrl);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card text-center p-4 border-0 shadow-sm"
        style={{ width: "150px" }} // Increased width
      >
        <div className="icon-circle bg-warning mb-3">
          <img src={imageUrl} alt="Restaurant Icon" className="icon-image" />
        </div>
        {/* <h5 className="text-danger" style={{ fontSize: "16px" }}>
          {category.categoryName}
        </h5>{" "} */}
      </div>
    </div>
  );
};

export default CategoryCard;
