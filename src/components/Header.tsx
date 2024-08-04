// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)

// #Date:12/12/21

'use client';
import React from 'react';
import '../Sass/App.scss';
import Select, {
  ActionMeta,
  MultiValue,
  OnChangeValue,
  SingleValue,
} from 'react-select';
import useSubredditOptions from '../hooks/useSubredditOptions';
import { useAppStore } from '../utils/store';
import Image from 'next/image';
import { SignOutButton } from '../components/RedditButton';
import SubbreditSelect from '../components/SubredditSelect';
import { Subreddit } from '../models/Subreddit';

export const Header: React.FC = () => {
  const subredditOption = useSubredditOptions();

  const setSubredditBanner = useAppStore((state) => state?.setSubredditBanner);
  const changeSubreddit = useAppStore((state) => state?.changeSubreddit);

  const handleChange = (selectedOption: OnChangeValue<Subreddit, false>) => {


    if (selectedOption !== null) {
      changeSubreddit(selectedOption?.value);
      setSubredditBanner(selectedOption?.banner);
    }
  };
  const defaultVal: Subreddit = {
    icon: 'https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png',
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
        <SubbreditSelect
          options={subredditOption}
          defaultVal={defaultVal}
          handleChange={handleChange}
        />
      </div>
      <SignOutButton />
    </div>
  );
};

export default Header;
