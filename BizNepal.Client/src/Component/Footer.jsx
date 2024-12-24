import React from "react";
import { Link } from "react-router-dom";
import "../Customcss/Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
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
              <a
                href="https://facebook.com/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/company/whybusinessthis"
                target="_blank"
                rel="noopener noreferrer"
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
          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/developer">Developer</a>
              </li>
              {/* <li className="mb-2">
                <a href="https://whybusinessthis.com/blog">Blog</a>
              </li> */}
              <li className="mb-2">
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>

          {/* For Businesses Section */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="mb-4">For Businesses</h5>
            <ul className="list-unstyled">
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
          <div className="col-lg-4 col-md-4 mb-4">
            <div className="footer-newsletter">
              <h5 className="mb-4">Subscribe to Our Newsletter</h5>
              <p>
                Get the latest updates about local businesses and special
                offers.
              </p>
              <form className="mt-3">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    aria-label="Your email address"
                  />
                  <button className="btn btn-light" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-4" />

        {/* Copyright and Policies Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              © {new Date().getFullYear()} bizNepal. All rights reserved.
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
