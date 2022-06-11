import React from 'react';
import axios from 'axios';
const subreddits = [
  'wallpaper',
  'MobileWallpaper',
  'wallpapers',
  'Animewallpaper',
  'SkyPorn',
  'Beachporn',
  'ImaginaryLandscapes',
  'ImaginaryCityscapes',
];

async function optionArray() {
  let promises = [];

  const getPfp = (subreddit) => {
    return new Promise(async (resolve) => {
      resolve({
        icon:
          (await axios
            .get(`https://www.reddit.com/r/${subreddit}/about.json`)
            .then(({ data: { data } }) => {
              return data.icon_img;
            })) ||
          'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',
        name: subreddit,
      });
    });
  };

  for (const subreddit of subreddits) {
    promises.push(getPfp(subreddit));
  }

  const results = await Promise.all(promises);
  return results;
}

export default optionArray;
