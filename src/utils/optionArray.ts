import { decode } from 'html-entities';

const subreddits: string[] = [
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

  const getPfp = async (subreddit: string) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/about.json`
    );

    const info = await response.json();
    const result = {
      icon:
        info.data.icon_img ||
        'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',
      banner: decode(info.data.banner_background_image),
      name: subreddit,
    };

    return result;
  };

  for (const subreddit of subreddits) {
    promises.push(getPfp(subreddit));
  }

  const results = await Promise.all(promises);

  return results;
}

export default optionArray;
