// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React, { useState } from 'react';
import Button from './Button';

import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const options = [
  {
    value: 'wallpaper',
    label: 'wallpaper',
    icon: (
      <img
        className="subreddit-icon"
        src="https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png"
        alt=""
      />
    ),
  },
  { value: 'wallx', label: 'wallx' },
  { value: 'wally', label: 'wally' },
];

function Header() {
  const [selected, setSelected] = useState('');

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      <div className="dropdown">
        <Select
          options={options}
          isSearchable={false}
          onChange={handleChange}
          autoFocus={true}
          getOptionLabel={(e) => (
            <div className="dropdown-label">
              {e.icon}
              <span className="dropdown-label-text">{e.label}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default Header;
