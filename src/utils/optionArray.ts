'use server';
import { decode } from 'html-entities';
import { BASE_URL, USER_AGENT } from './constants';
import { auth } from '../auth';

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
    const session = await auth();
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${session?.accessToken}`);
    headers.append('User-Agent', USER_AGENT);

    const option = {
      headers: headers,
    };
    const response = await fetch(
      `${BASE_URL}/r/${subreddit}/about.json`,
      option
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
