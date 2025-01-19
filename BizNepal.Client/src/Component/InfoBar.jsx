import { Container, Row, Col } from "react-bootstrap";
import "../Customcss/InfoBar.css";

const InfoBar = ({ reviews, business, address }) => {
  return (
    <div className="info-bar-container">
      <Container fluid className="info-bar">
        <Row className="bg-color text-dark align-items-center">
          {/* Left Section */}
          <Col size="12" lg="6" className="d-flex align-items-center p-3">
            <h1 className="fs-1 me-3">#1</h1>
            <h1 className="fs-1 text-center">
              Nepal's First Business Directory
            </h1>
          </Col>
          {/* Right Section */}
          <Col lg="6" className="d-flex justify-content-around text-center p-3">
            <div>
              <h3 className="fs-4">{business?.length || 0}</h3>
              <p className="mb-0">Total Listings</p>
            </div>
            <div>
              <h3 className="fs-4">2k+</h3>
              <p className="mb-0">Places of Nepal</p>
            </div>
            <div>
              <h3 className="fs-4">{reviews?.length || 0}</h3>
              <p className="mb-0">Happy Faces</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoBar;
