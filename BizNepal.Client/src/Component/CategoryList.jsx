import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard.jsx";
import { useGetAllCategoriesQuery } from "../slices/userApiSlices.js";
import { useEffect } from "react";
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
      <Container
        className="landingpage-category-container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
        id="category"
      >
        <h2 className="text-dark text-center">Browse By Category </h2>

        <p className="text-muted text-center my-5">
          {" "}
          Discover local businesses and services across various categories
        </p>
        <Row className="">
          {Categorydata.map((c, index) => (
            <Col key={c.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <Link to={`/category/${c.categoryName}`} className="text-decoration-none">
                <CategoryCard
                  iconPath={c.iconPath}
                  categoryName={c.categoryName}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryList;
