import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import OopsError from "../Component/Error.jsx";
import Business from "../Component/Business.jsx";
import Loader from "../Component/Loader.jsx";
import { useParams, Link } from "react-router-dom";
import { useSerachBusinessQuery } from "../slices/categoryApiSlices.js";
import "../Customcss/SearchScreen.css"; // Import custom styles

const SearchScreen = () => {
  const { keyword } = useParams();

  // Fetch business based on keyword
  const response = useSerachBusinessQuery(keyword, { skip: !keyword });
  const { data, error, isLoading, isError } = response;

  return (
    <>
      <Container className="search-container">
        <Link to="/">
          <button className="btn btn-outline-warning my-3 text-dark">
            Go Back
          </button>
        </Link>

        {isLoading && <Loader />}

        {isError ? (
          <OopsError
            message={
              error?.data?.message ||
              `There is no data for the keyword "${keyword}"`
            }
          />
        ) : (
          <div>
            <h1 className="search-title">Search Results</h1>
            <Row>
              {data?.map((b) => (
                <Col key={b.businessId} sm={12} md={6} lg={4} xl={3}>
                  <Business business={b} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default SearchScreen;
