import React from "react";

import { MDBContainer } from "mdb-react-ui-kit";
// import Carasoule from "./Carasoule";
import PromoVideo from "./PromoVideo";
import "../Customcss/PromoBanner.css";

const PromoBanner = () => {
  return (
    <>
      <MDBContainer fluid className="hero">
        <div className="content">
          <div className="header">
            <h2>Find the Perfect Business</h2>
            <p class="tagline">Discover local businesses in your area</p>

            <div class="promo-banner-container">
              {/* <Carasoule /> */}
              <PromoVideo />
            </div>

            {/* <Searchbox /> */}
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default PromoBanner;
