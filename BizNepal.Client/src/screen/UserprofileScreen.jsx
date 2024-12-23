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
  FaBell,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import TokenDecode from "../Component/TokenDecode";
import { useGetUserByIdQuery } from "../slices/userApiSlices"; // Import useGetUserByIdQuery

import { Logout } from "../slices/authSlices";

import "../Customcss/userprofile.css";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/");
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("general");
  const [activeTab, setActiveTab] = useState("posts");

  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null; // Get user ID from token

  const { data: userData, error, isLoading } = useGetUserByIdQuery(userId); // Use useGetUserByIdQuery
  console.log("userdata", userData);
  // setUser(userData); // Set user data to state
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setUserType(userData.businesses?.length > 0 ? "business" : "general");
    } else {
      setUser(null);
      console.log(error);
    }
  }, [userData]);

  const renderUserTypeBadge = () => {
    if (userType === "business") {
      return (
        <Badge bg="success" className="profile-type type-business text-light">
          Business Account
        </Badge>
      );
    } else {
      return (
        <Badge bg="warning" className="profile-type type-user text-light">
          General User
        </Badge>
      );
    }
  };

  const renderBusinessDetails = () => {
    if (userType === "business") {
      return (
        <ListGroup.Item>
          <h3 className="sidebar-title">Business Details</h3>
          <div className="info-item">
            <FaBuilding />
            <span id="business-type">Business Type</span>
          </div>
          <div className="info-item">
            <FaTag />
            <span id="business-category">Business Category</span>
          </div>
        </ListGroup.Item>
      );
    }
    return null;
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
                {renderUserTypeBadge()}

                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Following</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Followers</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="profile-sidebar">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="sidebar-title">Contact Information</h3>
                <div className="info-item">
                  <FaEnvelope />
                  <span id="user-email">
                    {user?.email || "email@example.com"}
                  </span>
                </div>
                <div className="info-item">
                  <FaPhone />
                  <span id="user-phone">
                    {user?.phoneNumber || "0000000000"}
                  </span>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span id="user-location">
                    {user?.location || "City, Country"}
                  </span>
                </div>
              </ListGroup.Item>

              {renderBusinessDetails()}

              <ListGroup.Item>
                <h3 className="sidebar-title">Settings</h3>
                <div className="settings-item" id="account-settings">
                  <Link
                    to={`/accountsettings/${userId}`}
                    style={{ textDecoration: "none", color: "#475569" }}
                  >
                    <FaCog /> Account Settings
                  </Link>
                </div>
                {/* <div className="settings-item" id="notification-settings">
                  <FaBell /> Notifications
                </div>
                <div className="settings-item" id="privacy-settings">
                  <FaLock /> Privacy & Security
                </div>
                */}
                <div
                  className="settings-item danger"
                  id="logout"
                  onClick={logoutHandler}
                >
                  <FaSignOutAlt /> Logout
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="main-content">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
              >
                <Tab eventKey="posts" title="Posts">
                  <div id="content-posts">
                    {/* Posts will be dynamically loaded here */}
                  </div>
                </Tab>
                <Tab eventKey="about" title="About">
                  <div id="content-about">
                    <p id="user-bio">{user?.bio || "Loading bio..."}</p>
                  </div>
                </Tab>
                <Tab eventKey="services" title="Services">
                  <div id="content-services">
                    {/* Services will be dynamically loaded here */}
                  </div>
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
