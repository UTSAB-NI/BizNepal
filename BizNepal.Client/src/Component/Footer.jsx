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
          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.to}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses Section */}
          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="mb-3">For Businesses</h6>
            <ul className="list-unstyled small">
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
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              © {new Date().getFullYear()} bizNepal. All rights reserved. ©{" "}
              {currentYear} bizNepal. All rights reserved.
            </p>
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
