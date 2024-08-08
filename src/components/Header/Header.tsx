// #Filename: Header.jsx
// #Author: Brian Twene (@bt521)

// #Date:12/12/21

'use client';
import React from 'react';
// import '../../Sass/App.scss';
import Select, {
  ActionMeta,
  MultiValue,
  OnChangeValue,
  SingleValue,
} from 'react-select';
import { useSubredditOptions } from '../../hooks/useSubredditOptions';
import { useAppStore } from '../../utils/store';
import Image from 'next/image';
import { SignOutButton } from '../RedditButton';
import SubbreditSelect from '../SubredditSelect';
import { Subreddit } from '../../models/Subreddit';
import styles from './Header.module.scss';
import { RedwallLogo } from '../Icon';
import Button from '../Button';
import { HiChevronDown } from 'react-icons/hi2';
import Link from 'next/link';
import {
  FaCog,
  FaUser,
  FaBookmark,
  FaHistory,
  FaSignOutAlt,
} from 'react-icons/fa';

export const Header: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);
  const navMenu = isActive ? `${styles['active']} ${styles.menu}` : styles.menu;

  // const subredditOption = useSubredditOptions();

  // const setSubredditBanner = useAppStore((state) => state?.setSubredditBanner);
  // const changeSubreddit = useAppStore((state) => state?.changeSubreddit);

  // const handleChange = (selectedOption: OnChangeValue<Subreddit, false>) => {

  //   if (selectedOption !== null) {
  //     changeSubreddit(selectedOption?.value);
  //     setSubredditBanner(selectedOption?.banner);
  //   }
  // };
  // const defaultVal: Subreddit = {
  //   icon: 'https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png',
  //   banner:
  //     'https://styles.redditmedia.com/t5_2qmjl/styles/bannerBackgroundImage_2qok6gpoiud71.png?width=4000&s=6b7f7b1846d648c37b4c12393a8ba2fe067300ca',
  //   value: 'wallpaper',
  //   label: 'r/wallpaper',
  // };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <RedwallLogo />
        </div>
        {/* <div className={styles.dropdown}>
          <SubbreditSelect
            options={subredditOption}
            defaultVal={defaultVal}
            handleChange={handleChange}
          />
        </div> */}
        <div onClick={() => setIsActive(!isActive)} className={styles.profile}>
          <Image
            src="https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"
            height={32}
            width={32}
            alt="profile_avatar"
          />

          {/* <span>u/twene521</span>
          <HiChevronDown /> */}
        </div>

        <div className={navMenu}>
          <section>
            <ul>
              <li>
                <Link href="/settings">
                  <FaCog /> Settings
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <FaUser /> Profile <span>u/twene521</span>
                </Link>
              </li>
              <li>
                <Link href="/saved">
                  <FaBookmark /> Saved
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <FaHistory /> History
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <FaSignOutAlt /> Sign out
                </Link>
              </li>
            </ul>
          </section>
          {/* <section>
            <ul>
              <li>
                <span>Theme</span>
              </li>
            </ul>
          </section> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
