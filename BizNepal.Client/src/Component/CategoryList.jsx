import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard.jsx";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices.js";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";
// Fetch users using RTK Query
import Categorydata from "../data/Category.js"

const CategoryList = () => {
  // const { data:Categorydata, error, isLoading, refetch } = useGetAllCategoriesQuery();

  // useEffect(() => {
  //   refetch();
  // }, []);

  // if (isLoading) return <p>Loading categories...</p>;
  // if (error) return <p>Error loading categories</p>;

  // console.log(data);

  return (
    <div>
      <MDBContainer
        className="category-container"
        style={{ marginTop: "6rem" }}
      >
        <h2 className="text-dark">Our Top Category</h2>
        <MDBRow className="my-2">
          {Categorydata.map((c, index) => (
            <MDBCol key={c.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <Link to={`/category/${c.categoryName}`}>
                <CategoryCard
                  iconPath={c.iconPath}
                  categoryName={c.categoryName}
                />

                <p className="text-danger text-center my-2">{c.categoryName}</p>
              </Link>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CategoryList;
