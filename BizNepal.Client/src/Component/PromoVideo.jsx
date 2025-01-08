import React from "react";
// import "../Customcss/PromoVideo.css";
const PromoVideo = () => {
  return (
    <div>
      <div
        className="video-container"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <video autoPlay loop className="promo-video" muted style={{
            width: "100%",
            height: "100%",
            height: "auto",
            position: "relative",
            zIndex: "1",
            opacity: "0.7",
            mixBlendMode: "multiply",
        }}>
          <source src="/images/video/covervideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default PromoVideo;
