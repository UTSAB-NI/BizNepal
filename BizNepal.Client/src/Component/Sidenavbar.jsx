import React from "react";
import { Link, } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../Customcss/Sidenavbar.css"

const Sidenavbar = () => {
  return (
    <div className="sidenav">
      <ul>
        <li><Link to="/admin/generaluser">General User</Link></li>
        <li><Link to="/admin/businessowner">Business Owner</Link></li>
        <li><Link to="/admin/business">Business</Link></li>
        <li><Link to="/admin/category">Category</Link></li>
        <li><Link to="/admin/alluser">All User</Link></li>
      </ul>
    </div>
  );

};

export default Sidenavbar;
