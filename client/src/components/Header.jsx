// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import Button from "./Button";
import { VscDesktopDownload, VscSettingsGear } from "react-icons/vsc";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      <div className="logo-buttons">
        <button className="btn download-app">
          <VscDesktopDownload /> <span>Download</span>
        </button>
        <button label="Settings" className="btn settings">
          <span>Settings</span> <VscSettingsGear />
        </button>
      </div>
    </div>
  );
}

export default Header;
