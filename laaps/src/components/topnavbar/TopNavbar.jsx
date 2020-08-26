import React from "react";

import logo from "../../assets/images/LaapsIcon.svg";
import title from "../../assets/images/LaapsText.svg";
import back from "../../assets/images/arrow_back.svg";

import "../../assets/styles/navbar.css";

function TopNavbar({ history }) {


  return (
    <nav
      className="navbar media is-fixed-top transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-item">
        <img className="" src={back} />
      </div>
      <div className="navbar-brand">
        <div className="file is-fixed-top">
          <img className="" src={logo} />
        </div>
      </div>
      <div className="navbar-item">
        <img className="" src={title} />
      </div>
    </nav>
  );
}

export default TopNavbar;
