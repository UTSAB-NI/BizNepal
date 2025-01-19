import React from "react";
import { Link } from "react-router-dom";
import "../Customcss/Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/whybusinessthis" },
    { icon: <FaTwitter />, url: "https://twitter.com/whybusinessthis" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/company/whybusinessthis" },
    { icon: <FaInstagram />, url: "https://instagram.com/whybusinessthis" },
  ];
  const quickLinks = [
    { text: "About Us", to: "/about" },
    { text: "FAQ", to: "/faq" },
    { text: "Help", to: "/help" },
  ];
  const businessLinks = [{ text: "Add Your Business", to: "/businesslist" }];

  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <a href="#top">
              <img
                src="/images/biznepallogo.png"
                alt="logo"
                className="footer-logo"
              />
            </a>
            <p className="small mt-2">
              Connecting local businesses with customers since 2023.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.to} className="text-decoration-none">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">For Businesses</h6>
            <ul className="list-unstyled">
              {businessLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.to} className="text-decoration-none">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3">Follow Us</h6>
            <div className="d-flex">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="me-3 social-icon"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="mb-0 small">
              © {currentYear} bizNepal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;