import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
import { Alert, Button } from "react-bootstrap";
import Loader from "../Component/Loader";

import { useSearchByCategoryQuery } from "../slices/categoryApiSlices";
import Business from "../Component/Business";
import CategoryCard from "../Component/CategoryCard";

const GetCategory = () => {
  const { category } = useParams(); // Get category from route params
  const { data, error, isLoading } = useSearchByCategoryQuery(category); // Fetch category data

  const [categoryData, setCategoryData] = useState([]);
  const [feedback, setFeedback] = useState("");

  // Use useEffect to update categoryData whenever data or error changes
  useEffect(() => {
    if (data) {
      setCategoryData(data); // Update state only if data is available
    }
    if (error) {
      setFeedback("An error occurred. Please try again later.");
    }
  }, [data, error]);

  console.log(categoryData);
  return (
    <div>
      {isLoading && <Loader />} {/* Show loader when fetching data */}
      {feedback && <Alert variant="danger">{feedback}</Alert>}{" "}
      {/* Show error message if error occurs */}
      {/* dropdown for filter the category  */}
      <MDBContainer
        className="category-container"
        style={{ marginTop: "6rem" }}
      >
        <h2 className="text-dark">Our Category</h2>
        <MDBRow className="my-2">
          {
            categoryData.length > 0
              ? categoryData.map((c) => (
                  <MDBCol
                    key={c.businessId}
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    className="mb-4"
                  >
                    <Link to={`/business/${c.businessId}`}>
                      <MDBCard
                        className="p-4 border border-gray-600 mx-2"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/category/${c.category}`}>
                          <img
                            src={c.image}
                            alt={c.name}
                            className="img-fluid rounded-circle"
                          />
                        </Link>
                      </MDBCard>
                      <p className="text-danger text-center my-2">
                        {c.businessName}
                      </p>
                    </Link>
                  </MDBCol>
                ))
              : !isLoading && <p>No categories found.</p> // Show message if no categories
          }
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default GetCategory;
