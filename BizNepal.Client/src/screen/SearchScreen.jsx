import React from "react";
import { Row, Col, Container,Button } from "react-bootstrap";
import OopsError from "../Component/Error.jsx";

import Business from "../Component/Business.jsx";

import Loader from "../Component/Loader.jsx";
import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";

import { useSerachBusinessQuery } from "../slices/categoryApiSlices.js";

const SearchScreen = () => {
  const { keyword } = useParams();

  //Fetch business based on keyword
  const response = useSerachBusinessQuery(keyword, { skip: !keyword });
  const { data, error, isLoading, isError } = response;

  console.log(response);

  //debugging
  console.log(data);
  return (
    <>
      <Container>
        <Link to="/">
            <button className="btn btn-outline-warning my-3 text-dark" >Go Back</button>
        </Link>

        {isLoading && <Loader />}

        {isError ? (
          <OopsError
            message={
              error?.data?.message || ` There is No any data called ${keyword}`
            }
          />
        ) : (
          <div>
            <h1>Search Results</h1>
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
