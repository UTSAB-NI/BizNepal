import React, { useState } from "react";
import "../Customcss/Faq.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: "What services does BizNepal offer?",
      answer:
        "BizNepal offers a comprehensive range of business solutions including company registration, tax consultation, accounting services, business advisory, and digital marketing services tailored for the Nepalese market.",
    },
    {
      question: "How long does it take to register a company in Nepal?",
      answer:
        "The company registration process typically takes 3-7 working days, depending on the type of company and documentation readiness. Our team ensures smooth processing and keeps you updated throughout the procedure.",
    },
    {
      question: "What documents are required for company registration?",
      answer:
        "Required documents include citizenship copies of all shareholders, passport-size photos, rental agreement or ownership documents of office space, and initial memorandum of association. Our team will guide you through the complete documentation process.",
    },
    {
      question: "Do you provide ongoing support after company registration?",
      answer:
        "Yes, we provide comprehensive post-registration support including tax compliance, annual reporting, accounting services, and business advisory. Our team remains available to address any concerns and support your business growth.",
    },
    {
      question: "What are your service charges?",
      answer:
        "Our service charges vary depending on the type of service and complexity of work. We maintain transparent pricing and provide detailed quotations before beginning any work. Contact us for a customized quote based on your specific requirements.",
    },
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about BizNepal's services and solutions</p>
      </div>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={activeIndex === index ? "rotate" : ""}
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;