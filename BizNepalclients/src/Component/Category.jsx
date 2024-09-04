import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Categorydata from "../data/Category.js";

const Category = () => {
  return (
    <div>
      <MDBContainer className="category-container" style={{ marginTop: "6rem" }}>
        <h2 className="text-dark">Our Top Category</h2>
        <MDBRow className="my-2">
          {Categorydata.map((c) => (
            <MDBCol key={c.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <MDBCard className="p-4 border border-gray-600 mx-2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Link to={`/category/${c.id}`}>
                  <img
                    src={c.image}
                    alt={c.name}
                    className="img-fluid rounded-circle"
                  />
                </Link>
              </MDBCard>
              <p className="text-danger text-center my-2">{c.name}</p>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Category;
