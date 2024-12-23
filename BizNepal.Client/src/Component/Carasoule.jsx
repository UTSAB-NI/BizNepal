import React from 'react'
import { Link } from 'react-router-dom'
import { MDBCarousel,MDBCarouselCaption,MDBCarouselItem,MDBBtn } from 'mdb-react-ui-kit'
const Carasoule = () => {
  return (
    <div>
      <MDBCarousel fade>
              <MDBCarouselItem itemId={1}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                {/* <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption> */}
              </MDBCarouselItem>

              <MDBCarouselItem itemId={2}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                {/* <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption> */}
              </MDBCarouselItem>

              <MDBCarouselItem itemId={3}>
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                {/* <MDBCarouselCaption>
                  <Link to="/register">
                    <MDBBtn>Get Best Deals</MDBBtn>
                  </Link>
                </MDBCarouselCaption> */}
              </MDBCarouselItem>
            </MDBCarousel>
    </div>
  )
}

export default Carasoule
