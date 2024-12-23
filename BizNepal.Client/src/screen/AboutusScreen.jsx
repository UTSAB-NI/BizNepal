import React, { useEffect, useRef } from "react";
import "../Customcss/About.css";
import { FaEnvelope, FaPhoneAlt, FaMapPin } from "react-icons/fa";
import {
  useGetUserReviewQuery,
  useGetbusinessQuery,
  useGetAlluserQuery,
} from "../slices/userApiSlices";

const About = () => {
  const { data: reviewData } = useGetUserReviewQuery();
  const { data: businessData } = useGetbusinessQuery();
  const { data: userData } = useGetAlluserQuery();

  const animatedSections = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedSections.current.forEach((el) => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1>About BizNepal</h1>
          <p>Connecting Businesses, Empowering Nepal</p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container about-container">
        <section
          className="section animated"
          ref={(el) => (animatedSections.current[0] = el)}
        >
          <h2>About Us</h2>
          <div className="card">
            <p>
              BizNepal is Nepal's premier business directory platform, dedicated
              to bridging the gap between businesses and consumers. Established
              with a vision to digitalize Nepal's business ecosystem, we provide
              comprehensive business listings, verified information, and
              valuable resources to help businesses grow and consumers make
              informed decisions.
            </p>
            <p>
              Our platform serves as a central hub for discovering, connecting
              with, and promoting businesses across Nepal, from traditional
              enterprises to emerging startups.
            </p>
          </div>
        </section>

        {/* Why BizNepal Section */}
        <section
          className="section animated"
          ref={(el) => (animatedSections.current[1] = el)}
        >
          <h2>Why BizNepal?</h2>
          <div className="stats">
            <div className="stat-card">
              <h3>{businessData?.length}+ </h3>
              <p>Listed Businesses</p>
            </div>
            <div className="stat-card">
              <h3>75+</h3>
              <p>Districts Covered</p>
            </div>
            <div className="stat-card">
              <h3>{userData?.length}+</h3>
              <p>Users</p>
            </div>
            <div className="stat-card">
              <h3>{reviewData?.length}+ </h3>
              <p>Reviewd Business</p>
            </div>
          </div>
          <div className="card">
            <p>✓ Comprehensive Business Listings</p>
            <p>✓ Verified Business Information</p>
            <p>✓ User-Friendly Interface</p>
            <p>✓ Free Business Registration</p>
            <p>✓ Regular Updates and Maintenance</p>
            <p>✓ Dedicated Customer Support</p>
          </div>
        </section>

        {/* Our Impact Section */}
        <section
          className="section animated"
          ref={(el) => (animatedSections.current[2] = el)}
        >
          <h2>Our Impact</h2>
          <div className="card">
            <p>
              BizNepal has played a crucial role in digitalizing Nepal's
              business landscape. We've helped:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Small businesses increase their online visibility</li>
              <li>Consumers find reliable business information</li>
              <li>Create digital opportunities for traditional businesses</li>
              <li>Foster business networking and growth</li>
              <li>Promote digital adoption in Nepal's business sector</li>
            </ul>
          </div>
        </section>
        {
          // list your business join us section
        }
        <section
          className="section animated"
          ref={(el) => (animatedSections.current[4] = el)}
        >
          <h2>List Your Business</h2>
          <div className="card">
            <p>
              Join BizNepal today and get your business listed on Nepal's
              fastest-growing business directory platform. Enjoy a host of
              benefits, including:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Increased online visibility</li>
              <li>Access to a wider customer base</li>
              <li>Enhanced business credibility</li>
              <li>Free business registration</li>
              <li>Regular updates and maintenance</li>
              <li>And much more!</li>
            </ul>
            <a href="/businesslist" className="btn btn-primary">
              List Your Business
            </a>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          className="section animated"
          ref={(el) => (animatedSections.current[3] = el)}
        >
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <div className="icon">
                <FaMapPin />
              </div>
              <div>
                <h3>Address</h3>
                <p>Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <FaEnvelope />
              </div>
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:contact@biznepal.com">contact@biznepal.com</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <FaPhoneAlt />
              </div>
              <div>
                <h3>Phone</h3>
                <p>+977-1-4XXXXXX</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
