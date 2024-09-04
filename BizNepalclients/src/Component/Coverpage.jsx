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
import Carasoule from "./Carasoule";
import "../Customcss/coverpage.css";

const Coverpage = () => {
  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md={8} className="left-cover-page">
            <Carasoule/>
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
