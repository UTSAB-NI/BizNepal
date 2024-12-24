import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard.jsx";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices.js";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";
// Fetch users using RTK Query
// import Categorydata from "../data/Category.js"

const CategoryList = () => {
  const {
    data: Categorydata,
    error,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;

  // console.log(data);
  console.log(Categorydata);

  return (
    <div>
      <MDBContainer
        className="landingpage-category-container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
        id="category"
      >
        <h2 className="text-dark text-center">Browse By Category </h2>

        <p className="text-muted text-center my-5">
          {" "}
          Discover local businesses and services across various categories
        </p>
        <MDBRow className="">
          {Categorydata.map((c, index) => (
            <MDBCol key={c.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <Link to={`/category/${c.categoryName}`}>
                <CategoryCard
                  iconPath={c.iconPath}
                  categoryName={c.categoryName}
                />
              </Link>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CategoryList;
