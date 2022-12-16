// #Filename: FooterRight.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import { SiReddit } from "react-icons/si";
function FooterRight() {
  return (
    <div className="footerRight footer-section">
      <span>Pictures from</span>:
      <br />
      <a href="https://www.reddit.com/r/wallpaper/">
        <SiReddit /> r/wallpaper
      </a>
    </div>
  );
}

export default FooterRight;
