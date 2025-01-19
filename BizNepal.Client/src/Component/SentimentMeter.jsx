import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Customcss/sentiment.css"; // Import the CSS file
import Loader from "./Loader";
import Error from "./Error";

const SentimentMeter = ({ businessId }) => {
  console.log("businessId", businessId);
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const getSentiment = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://localhost:5000/api/Business/predict?businessId=${businessId}`,
        {},
        config
      );
      setSentimentData(data);
    } catch (error) {
      setFeedback(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSentiment();
  }, [businessId]);

  const total_review =
    sentimentData?.positive_review + sentimentData?.negative_review;

  // Function to update the meter
  const updateMeter = (value) => {
    const meterValue = document.querySelector(".meter-value");
    const circumference = 314; // Approximate path length
    const offset = circumference - (value / 100) * circumference;
    meterValue.style.strokeDashoffset = offset;

    // Update the needle rotation
    const needle = document.querySelector(".meter-needle");
    const rotation = -90 + (value / 100) * 180;
    needle.style.transform = `rotate(${rotation}deg)`;

    // Add bounce animation to needle
    needle.style.transition =
      "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
    setTimeout(() => {
      needle.style.transition = "transform 0.5s ease-in-out";
    }, 500);
  };

  // Update the meter when sentimentData changes
  useEffect(() => {
    if (sentimentData) {
      // Calculate sentiment value based on the response
      const sentimentValue =
        sentimentData.sentiment === 1
          ? 100
          : sentimentData.sentiment === 2
          ? 50
          : 0;
      updateMeter(sentimentValue);
      console.log("sentiment", sentimentValue);
    }
  }, [sentimentData]);

  console.log("sentimentData", sentimentData);

  return (
    <div className="sentiment-container">
      <h1>Business Sentiment Meter</h1>

      {loading && <Loader />}
      {feedback && <Error message={feedback} variant="danger" />}

      {sentimentData && (
        <div className="row my-3">
          {/* Sentiment Meter Card */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sentiment Meter</h5>
                <div className="meter-gauge d-flex flex-column align-items-center">
                  <svg width="300" height="200">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" style={{ stopColor: "#ff4444" }} />
                        <stop offset="50%" style={{ stopColor: "#ffaa00" }} />
                        <stop offset="100%" style={{ stopColor: "#44ff44" }} />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 50 150 A 100 100 0 0 1 250 150"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 50 150 A 100 100 0 0 1 250 150"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="20"
                      strokeLinecap="round"
                      className="meter-value"
                    />

                    <circle
                      cx="150"
                      cy="150"
                      r="10"
                      className="meter-needle-center"
                    />
                    <line
                      x1="150"
                      y1="150"
                      x2="150"
                      y2="70"
                      stroke="#333"
                      strokeWidth="4"
                      className="meter-needle"
                    />

                    {/* Gauge markers */}
                    <text x="40" y="180" className="gauge-label">
                      0
                    </text>
                    <text x="150" y="190" className="gauge-label">
                      50
                    </text>
                    <text x="260" y="180" className="gauge-label">
                      100
                    </text>
                  </svg>

                  <div className="meter-value-display">
                    Sentiment:{" "}
                    <span id="value-display">
                      {sentimentData.sentiment === 1
                        ? "Positive"
                        : sentimentData.sentiment === 2
                        ? "Neutral"
                        : "Negative"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Bars Card */}
          <div className="col-md-6">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Review Analysis</h5>
                <div className="flow-bars">
                  <div className="flow-bar">
                    <div className="flow-bar-label">Positive Reviews</div>
                    <div className="flow-bar-track">
                      <div
                        className="flow-bar-fill positive"
                        style={{
                          width: `${
                            (sentimentData.positive_review / total_review) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flow-bar-value">
                      {(
                        (sentimentData.positive_review / total_review) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  </div>

                  <div className="flow-bar">
                    <div className="flow-bar-label">Negative Reviews</div>
                    <div className="flow-bar-track">
                      <div
                        className="flow-bar-fill negative"
                        style={{
                          width: `${
                            (sentimentData.negative_review / total_review) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flow-bar-value">
                      {(
                        (sentimentData.negative_review / total_review) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentMeter;
