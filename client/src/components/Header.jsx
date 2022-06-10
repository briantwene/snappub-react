// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React, { useState } from 'react';
import Button from './Button';

import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import UseSubredditOptions from '../hooks/UseSubredditOptions';
import { useSubredditStore } from '../utils/store';

function Header() {
  const subredditOption = UseSubredditOptions();
  const currentSubreddit = useSubredditStore(
    (state) => state.current_subreddit
  );
  const changeSubreddit = useSubredditStore((state) => state.changeSubreddit);
  const defaultOption = subredditOption[0];
  const handleChange = (selectedOption) => {
    changeSubreddit(selectedOption.value);
  };

  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      <div className="dropdown">
        <Select
          options={subredditOption}
          defaultValue={defaultOption}
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
