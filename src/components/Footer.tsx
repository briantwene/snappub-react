// #Filename: Footer.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from 'react';

import FooterMid from './FooterMid';
import FooterLeft from './FooterLeft';

function Footer() {
  return (
    <div className="footer">
      <FooterLeft />
      <FooterMid />
    </div>
  );
}

export default Footer;
