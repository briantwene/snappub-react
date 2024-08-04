import { DetailedWallpaper, Wallpaper } from '../models/reddit';
import { DEFAULT_DETAILED_WALLPAPER } from '../utils/constants';
import { getMetadata, generateThumbnail } from '../utils/utils';

const fetchOne = require('../models/fetchReddit');
const { defaultImageGenerator } = require('../defaultImageGenerator');
const { getFileSize } = require('./getFileSize');

const getRedditorInfo = async (author: string) => {
  try {
    const response = await fetch(
      `https://www.reddit.com/user/${author}/about.json`
    );
    if (!response.ok) {
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
  }
};

exports.fetchInfo = async (imageId: string): Promise<DetailedWallpaper> => {
  try {
    const response = await fetchOne(imageId);
    const data = response.data.children[0].data;

    const metadata = await getMetadata(data.url);
    const info = await getRedditorInfo(data.author);
    const thumbnail = await generateThumbnail(data.url);
    const size = await getFileSize(data.url);

    const wallpaper: DetailedWallpaper = {
      ...info,
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
