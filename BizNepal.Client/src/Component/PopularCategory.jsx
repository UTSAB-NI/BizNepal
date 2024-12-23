import React from "react";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices.js";
import "../Customcss/PopularCategory.css";
import CategoryCard from "./CategoryCard.jsx";
const PopularCategory = () => {
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  const API_BASE_URL = "https://localhost:5000";

  const popularCategories = categories?.filter((category) =>
    ["Restaurant", "Gym", "Salon", "School"].includes(category?.categoryName)
  ) || ["Restaurant", "Gym", "Salon", "Spa"];

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5">Failed to load categories</div>;
  }

  return (
    <section>
      <div className="container-fluid popular-category-container bg-light">
        <h2 className="text-center m-5 text-dark">Popular Categories</h2>
        <div className=" d-flex justify-content-center align-items-center flex-wrap">
          {popularCategories.length > 0 ? (
            popularCategories.map((category) => (
              <div key={category.id}>
                <Link to={`/category/${category.categoryName}`}>
                  {/* <div className="  popular-category-card text-center">
                    <img
                      src={`${API_BASE_URL}${category?.iconPath}`}
                      alt={category?.categoryName || "Category"}
                      className="category-icon mx-auto "
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category?.categoryName}</h5>
                    </div>
                  </div> */}
                  <CategoryCard
                    iconPath={category.iconPath}
                    categoryName={category.categoryName}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">No popular categories available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
