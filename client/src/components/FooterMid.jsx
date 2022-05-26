// #Filename: FooterMid.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import { SiGithub } from "react-icons/si";

function FooterMid() {
  return (
    <div className="footerMid footer-section">
      <div className="top">
        <button className="backtop">
          {/* remember to make this react-router-dom friendly */}
          <a href="#">Back-to-Top</a>
        </button>
      </div>
      <div className="social">
        <a href="https://github.com/bt521">
          <span>@bt521</span> <SiGithub />
        </a>
      </div>
    </div>
  );
}

export default FooterMid;
