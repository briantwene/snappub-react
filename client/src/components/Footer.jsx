// #Filename: Footer.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import FooterRight from "./FooterRight";
import FooterMid from "./FooterMid";
import FooterLeft from "./FooterLeft";

function Footer() {
  return (
    <div className="footer">
      <FooterLeft />
      <FooterMid />
      <FooterRight />
    </div>
  );
}

export default Footer;
