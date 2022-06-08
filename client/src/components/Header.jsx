// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React, { useState } from 'react';
import Button from './Button';

import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      <div
        className="dropdown"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <button className="current-subreddit">
          <img
            className="current-subreddit-image"
            src="https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png"
            alt=""
          />
          <span>w/wallpaper</span>
          <span className="dropdown-icon">
            <RiIcons.RiArrowDropDownFill />
          </span>
        </button>

        <ul className={`dropdown-content${isOpen ? '__show' : ''}`}>
          <li>wallpaper</li>
          <li>wallpaper</li>
          <li>wallpaper</li>
          <li>wallpaper</li>
          <li>wallpaper</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
