import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Tab,
  Tabs,
  Badge,
  Image,
} from "react-bootstrap";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaTag,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import TokenDecode from "../Component/TokenDecode";

import {
  useGetUserByIdQuery,
  useGetUserReviewQuery,
} from "../slices/userApiSlices";
import { Logout } from "../slices/authSlices";
import "../Customcss/userprofile.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null;

  const { data: userData, error: userError } = useGetUserByIdQuery(userId);
  const { data: userReview } = useGetUserReviewQuery();

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("general");
  const [activeTab, setActiveTab] = useState("posts");

  console.log("User Data", userData);
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setUserType(userInfo.role ==="BusinessOwner" ? "business" : "general");
    } else if (userError) {
      console.error(userError);
    }
  }, [userData, userError]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

  const renderBadge = () => (
    <Badge
      bg={userType === "business" ? "success" : "warning"}
      className={`profile-type text-light ${
        userType === "business" ? "type-business" : "type-user"
      }`}
    >
      {userType === "business" ? "Business Account" : "General User"}
    </Badge>
  );

  const renderBusinessDetails = () =>
    userType === "business" && (
      <ListGroup.Item>
        <h3 className="sidebar-title">Business Details</h3>
        <div className="info-item">
          <FaBuilding />
          <span>Business Type</span>
        </div>
        <div className="info-item">
          <FaTag />
          <span>Business Category</span>
        </div>
      </ListGroup.Item>
    );

  const renderReviews = () => {
    const userReviews = userReview?.filter(
      (review) => review.userId === userId
    );

    return userReviews?.map((review, index) => (
      <Card key={index} className="review-card">
        <Row>
          <Col xs={2} className="text-center">
            <Image
              src="/image/1.jpg"
              roundedCircle
              alt="User Avatar"
              className="reviewer-avatar"
            />
          </Col>
          <Col xs={10}>
            <Row className="align-items-center">
              <Col xs={8}>
                <h5 className="reviewer-name">
                  {review?.business?.businessName}
                </h5>
              </Col>
              <Col xs={4} className="text-end">
                <Badge bg="success" style={{ fontSize: "0.8rem" }}>
                  Reviewed
                </Badge>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12}>
                <p>{review?.comment}</p>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6}>
                <p>{Array(review?.rating).fill("⭐").join(" ")}</p>
              </Col>
              <Col xs={6} className="text-end text-muted">
                <p>{new Date(review?.createdAt).toLocaleDateString()}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    ));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card className="profile-header">
            <Card.Body>
              <div className="profile-cover">
                <img
                  src="/images/biznepallogo.png"
                  alt="Profile Cover"
                  className="cover-image"
                />
              </div>
              <Image
                src={user?.avatar_url || "/images/woman.png"}
                alt="Profile Avatar"
                className="profile-avatar"
                width={150}
                height={150}
                roundedCircle
              />
              <Button
                variant="light"
                className="edit-profile"
                href={`/editprofile/${userId}`}
              >
                <FaEdit /> Edit Profile
              </Button>
              <div className="profile-info">
                <h1 className="profile-name">
                  {user?.userName || "Loading..."}
                </h1>
                <div className="profile-username">
                  @{user?.userName || "loading"}
                </div>
                {renderBadge()}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="profile-sidebar">
            <div className="info-item">
              <FaEnvelope />
              <span>{user?.email || "email@example.com"}</span>
            </div>
            <div className="info-item">
              <FaPhone />
              <span>{user?.phoneNumber || "0000000000"}</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <span>{user?.location || "City, Country"}</span>
            </div>

            {/* {renderBusinessDetails()} */}

            <h3 className="sidebar-title">Settings</h3>
            <div className="settings-item">
              <Link
                to={`/accountsettings/${userId}`}
                className="text-decoration-none text-dark"
              >
                <FaCog /> Account Settings
              </Link>
            </div>
            <div className="settings-item danger" onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </div>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="main-content">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={setActiveTab}
                className="mb-3"
              >
                <Tab eventKey="posts" title="Posts">
                  <div>Posts will be dynamically loaded here</div>
                </Tab>
                <Tab eventKey="about" title="About">
                  <p>{user?.bio || "Loading bio..."}</p>
                </Tab>
                <Tab eventKey="services" title="Services">
                  <div>Services will be dynamically loaded here</div>
                </Tab>
                <Tab eventKey="review" title="Reviewed">
                  {renderReviews()}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
