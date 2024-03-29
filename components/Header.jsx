// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from 'react';

import Select from 'react-select';
import UseSubredditOptions from '../hooks/UseSubredditOptions';
import { useSubredditStore } from '../utils/store';
import Image from 'next/image';

function Header() {
  const subredditOption = UseSubredditOptions();

  const setSubredditBanner = useSubredditStore(
    (state) => state?.setSubredditBanner
  );
  const changeSubreddit = useSubredditStore((state) => state?.changeSubreddit);

  const handleChange = (selectedOption) => {
    changeSubreddit(selectedOption.value);
    setSubredditBanner(selectedOption.banner);
  };
  const defaultVal = {
    icon: (
      <Image
        src={
          'https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png'
        }
        alt={'wallpaper'}
        height="32"
        width="32"
        className="subreddit-icon"
      />
    ),
    banner:
      'https://styles.redditmedia.com/t5_2qmjl/styles/bannerBackgroundImage_2qok6gpoiud71.png?width=4000&s=6b7f7b1846d648c37b4c12393a8ba2fe067300ca',
    value: 'wallpaper',
    label: 'r/wallpaper',
  };
  return (
    <div className="header">
      <div className="logo">
        <span className="snap-logo">Snap-Pub</span>
      </div>
      <div className="dropdown">
        <Select
          options={subredditOption}
          defaultValue={defaultVal}
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
