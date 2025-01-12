import React from "react";
import { Link } from "react-router-dom";
import "../Customcss/Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/whybusinessthis" },
    { icon: <FaTwitter />, url: "https://twitter.com/whybusinessthis" },
    {
      icon: <FaLinkedin />,
      url: "https://linkedin.com/company/whybusinessthis",
    },
    { icon: <FaInstagram />, url: "https://instagram.com/whybusinessthis" },
  ];

  const quickLinks = [
    { text: "About Us", to: "/about" },
    { text: "FAQ", to: "/faq" },
    { text: "Help", to: "/help" },
  ];

  const businessLinks = [
    { text: "Add Your Business", to: "/businesslist" },
    { text: "Advertising", url: "https://whybusinessthis.com/advertising" },
    { text: "Pricing", url: "https://whybusinessthis.com/pricing" },
    {
      text: "Resources",
      url: "https://whybusinessthis.com/business-resources",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row mb-5">
          {/* About Section */}
          <div className="col-lg-4 mb-4">
            <h5 className="mb-4">
              <a href="#top">
                <img
                  src="/images/biznepallogo.png"
                  alt="logo"
                  style={{
                    width: "200px",
                    backgroundColor: "white",
                    borderRadius: "50px",
                  }}
                />
              </a>
            </h5>
            <p>
              Connecting local businesses with customers since 2023. Our
              platform helps you discover, review, and connect with the best
              local businesses in your area.
            </p>
            <div className="footer-social-icons mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.to}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses Section */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="mb-4">For Businesses</h5>
            <ul className="list-unstyled">
              {businessLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  {link.to ? (
                    <Link to={link.to}>{link.text}</Link>
                  ) : (
                    <a href={link.url}>{link.text}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-4" />

        {/* Copyright and Policies Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              © {currentYear} bizNepal. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="https://whybusinessthis.com/terms" className="me-3">
              Terms of Service
            </a>
            <a href="https://whybusinessthis.com/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
