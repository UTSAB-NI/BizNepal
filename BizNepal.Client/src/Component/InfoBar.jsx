import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "../Customcss/InfoBar.css";

const InfoBar = ({ reviews, business, address }) => {
  console.log(reviews);
  console.log(business);
  return (
    <div>
      <MDBContainer fluid className="info-bar">
        <MDBRow className="bg-color text-dark align-items-center ">
          {/* Left Section */}
          <MDBCol size="12" lg="6" className="d-flex align-items-center p-3">
            <h1 className="fs-1 me-3">1#</h1>
            <h1 className="fs-1 text-center">
              Nepal's First Business Directory
            </h1>
          </MDBCol>
          {/* Right Section */}
          <MDBCol
            lg="6"
            className="d-flex justify-content-around text-center p-3"
          >
            <div>
              <h3 className="fs-4">{business?.length}</h3>
              <p className="mb-0">Total Listings</p>
            </div>
            <div>
              <h3 className="fs-4">2k+</h3>
              <p className="mb-0">Places of Nepal</p>
            </div>
            <div>
              <h3 className="fs-4">{reviews?.length}</h3>
              <p className="mb-0">Happy Faces</p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default InfoBar;
