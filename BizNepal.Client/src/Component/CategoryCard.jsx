import React from "react";
import "../Customcss/categoryCard.css"; // Custom CSS for styling

const API_BASE_URL = "https://localhost:5000";
const CategoryCard = ({ iconPath, categoryName }) => {
  //   console.log(iconPath);

  // const imageUrl = `${API_BASE_URL}${iconPath}`;
  const imageUrl = "/images/1.png";
  console.log(imageUrl);

  return (
    <div className="category-card">
      <div className="category-icon-container">
        <img src={imageUrl} alt="Restaurant Icon" className="category-icon" />
      </div>
      <div className="category-title-container">
        <h1 className=" category-title ">{categoryName}</h1>{" "}
      </div>
    </div>
  );
};

export default CategoryCard;
