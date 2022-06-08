// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from 'react';
import Button from './Button';

import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      {/* <div className="logo-buttons">
        <Link to="/download" className="btn navlink download-app">
          <RiIcons.RiDownload2Fill />
          <span>Download</span>
        </Link>
        <Link to="/settings" className="btn navlink settings">
          <RiIcons.RiSettings5Fill />
          <span>Settings</span>
        </Link>
      </div> */}
    </div>
  );
}

export default Header;
