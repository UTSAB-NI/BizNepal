import React from "react";
import "../Customcss/coverpage.css";

const Coverpage = () => {
  return (
    <>
      <div className="cover-page">
        <div className="left-container"><img src="images/image.png" /></div>
        <div className="right-container">
          <div className="grid gap-4 grid-cols-2">
            <div className="box"><img src="images/1.png"/></div>
            <div className="box"><img src="images/2.png"/></div>
            <div className="box"><img src="images/3.png"/></div>
            <div className="box"><img src="images/4.png"/></div>
          </div>
        </div>
        <button className="btn text-white border-t-neutral-700" >Get Best Deals</button>
      </div>
    </>
  );
};

export default Coverpage;
