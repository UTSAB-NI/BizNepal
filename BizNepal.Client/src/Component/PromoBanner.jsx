import React from "react";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Carasoule from "./Carasoule";
import Searchbox from "./Searchbox";
import "../Customcss/PromoBanner.css";

const PromoBanner = () => {
  return (
    <>
      <MDBContainer fluid className="hero">
        <div className="content">
          <div className="header">
            <h1>biznepal</h1>
            <p class="tagline">Discover local businesses in your area</p>

            <div class="carousel">
              <Carasoule />
            </div>

            {/* <Searchbox /> */}

            <div class="popular-categories">
              <h2>Popular Categories</h2>
              <div class="category">Restaurants</div>
              <div class="category">Retail</div>
              <div class="category">Services</div>
              <div class="category">Healthcare</div>
              <div class="category">Technology</div>
              <div class="category">Entertainment</div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default PromoBanner;
