
import axios from 'axios';
import { decode } from 'html-entities';
const subreddits = [
  'wallpaper',
  'MobileWallpaper',
  'iphonewallpapers',
  'iphonexwallpapers',
  'wallpapers',
  'phonewallpapers',
  'Animewallpaper',
  'iWallpaper',
  'earthporn',
  'SkyPorn',
  'Beachporn',
  'ImaginaryLandscapes',
  'ImaginaryCityscapes',
];

//
async function optionArray() {
  let promises = [];

  const getPfp = async (subreddit) => {
    const info = await axios
      .get(`https://www.reddit.com/r/${subreddit}/about.json`)
      .then(({ data: { data } }) => {
        return {
          icon:
            data.icon_img ||
            'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',

          banner: decode(data.banner_background_image),
          name: subreddit,
        };
      });

    return info;
  };

  for (const subreddit of subreddits) {
    promises.push(getPfp(subreddit));
  }

  const results = await Promise.all(promises);

  return results;
}

export default optionArray;
