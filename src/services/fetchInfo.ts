import { auth } from '../auth';
import {
  DetailedWallpaper,
  RedditorBasicInfo,
  Wallpaper,
} from '../models/reddit';
import {
  BASE_URL,
  DEFAULT_DETAILED_WALLPAPER,
  USER_AGENT,
} from '../utils/constants';
import { getMetadata, generateThumbnail } from '../utils/utils';

const { fetchOne } = require('../models/fetchReddit');
import { defaultImageGenerator } from './defaultImageGenerator';
const { getFileSize } = require('./getFileSize');

export const getRedditorInfo = async (
  author: string
): Promise<RedditorBasicInfo> => {
  const session = await auth();
  const headers = new Headers();

  headers.append('Authorization', `Bearer ${session?.accessToken}`);
  headers.append('User-Agent', USER_AGENT);

  const options = {
    headers: headers,
  };
  try {
    const response = await fetch(
      `${BASE_URL}/user/${author}/about.json`,
      options
    );
    if (!response.ok) {
      console.error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return {
      karma: data.total_karma,
      avatar: data.snoovatar_img || defaultImageGenerator(),
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log('there was an error in fetching profile data:', e.message);
    }
    return {
      karma: 0,
      avatar: defaultImageGenerator(),
    };
  }
};

export const fetchInfo = async (
  imageId: string
): Promise<DetailedWallpaper> => {
  try {
    const response = await fetchOne(`t3_${imageId}`);

    const data = response.children[0].data;

    const metadata = await getMetadata(data.url);
    const info = await getRedditorInfo(data.author);
    const thumbnail = await generateThumbnail(data.url);
    const size = await getFileSize(data.url);

    const wallpaper: DetailedWallpaper = {
      avatar: info.avatar,
      karma: info.karma,
      id: data.id,
      src: data.url,
      thumb: thumbnail,
      author: data.author,
      subreddit: data.subreddit_name_prefixed,
      title: data.title,
      created_at: data.created_utc,
      rating: data.score,
      metadata: metadata,
      size: size,
    };

    return wallpaper;
  } catch (error) {
    if (error instanceof Error)
      console.error('Error fetching image info:', error.message);
    return DEFAULT_DETAILED_WALLPAPER;
  }
};
