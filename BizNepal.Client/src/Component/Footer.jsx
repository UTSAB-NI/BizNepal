import React from "react";
import { Link } from "react-router-dom";
import "../Customcss/Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer py-3">
      <div className="container">
        <div className="row mb-4">
          {/* About Section */}
          <div className="col-lg-3 col-md-6 mb-3">
            <a href="#top">
              <img
                src="/images/biznepallogo.png"
                alt="logo"
                style={{
                  width: "150px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                }}
              />
            </a>
            <p className="small mt-2">
              Connecting local businesses with customers since 2023.
            </p>
            <div className="footer-social-icons mt-3">
              <a
                href="https://facebook.com/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/company/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </div>

          {/* For Businesses Section */}
          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="mb-3">For Businesses</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/businesslist">Add Your Business</a>
              </li>
              <li className="mb-2">
                <a href="https://whybusinessthis.com/advertising">
                  Advertising
                </a>
              </li>
              <li className="mb-2">
                <a href="https://whybusinessthis.com/pricing">Pricing</a>
              </li>
              <li className="mb-2">
                <a href="https://whybusinessthis.com/business-resources">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h6 className="mb-3">Subscribe</h6>
            <form className="small">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <button className="btn btn-light btn-sm" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start small">
            © {new Date().getFullYear()} bizNepal. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end small">
            <a href="https://whybusinessthis.com/terms" className="me-2">
              Terms
            </a>
            <a href="https://whybusinessthis.com/privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
