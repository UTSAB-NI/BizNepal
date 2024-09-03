import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Image, Carousel } from "react-bootstrap";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "../Customcss/coverpage.css";

const Coverpage = () => {
  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md={8} className="left-cover-page">
            <MDBCarousel fade>
              <MDBCarouselItem itemId={1}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>

              <MDBCarouselItem itemId={2}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>

              <MDBCarouselItem itemId={3}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarousel>
          </MDBCol>
          <MDBCol md={4} className="right-cover-page">
            <MDBRow style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <MDBCol md={6} className="box">
                <img src="/images/1.png" className="img"></img>
              </MDBCol>
              <MDBCol md={6} className="box">
                <img src="/images/2.png" className="img"></img>
              </MDBCol>
              <MDBCol md={6} className="box">
                <img src="/images/3.png" className="img"></img>
              </MDBCol>
              <MDBCol md={6} className="box">
                <img src="/images/4.png" className="img"></img>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Coverpage;
