// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React, { useState } from 'react';
import Button from './Button';

import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import UseSubredditOptions from '../hooks/UseSubredditOptions';

function Header() {
  const [selected, setSelected] = useState('');

  const subredditOption = UseSubredditOptions();
  console.log(subredditOption);

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
          options={subredditOption}
          value={subredditOption[0]}
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
