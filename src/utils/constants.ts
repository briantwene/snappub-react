import { DetailedWallpaper } from '../models/reddit';

export const DONWLOAD_RESOLUTIONS = [
  {
    width: 2560,
    height: 1080,
    aspect: '21:9',
  },
  {
    width: 3440,
    height: 1440,
    aspect: '21:9',
  },
  {
    width: 5120,
    height: 2160,
    aspect: '21:9',
  },
  {
    width: 1280,
    height: 720,
    aspect: '16:9',
  },
  {
    width: 1366,
    height: 768,
    aspect: '16:9',
  },
  {
    width: 1600,
    height: 900,
    aspect: '16:9',
  },
  {
    width: 1920,
    height: 1080,
    aspect: '16:9',
  },
  {
    width: 2560,
    height: 1440,
    aspect: '16:9',
  },
  {
    width: 3840,
    height: 2160,
    aspect: '16:9',
  },
  {
    width: 5120,
    height: 2880,
    aspect: '16:9',
  },
  {
    width: 7680,
    height: 4320,
    aspect: '16:9',
  },
  {
    width: 1280,
    height: 800,
    aspect: '16:10',
  },
  {
    width: 1920,
    height: 1200,
    aspect: '16:10',
  },
  {
    width: 2560,
    height: 1080,
    aspect: '16:10',
  },
  {
    width: 1400,
    height: 1050,
    aspect: '4:3',
  },
  {
    width: 1440,
    height: 1080,
    aspect: '4:3',
  },
  {
    width: 1600,
    height: 1200,
    aspect: '4:3',
  },
  {
    width: 1920,
    height: 1440,
    aspect: '4:3',
  },
  {
    width: 2048,
    height: 1536,
    aspect: '4:3',
  },
];

export const DEFAULT_DETAILED_WALLPAPER: DetailedWallpaper = {
  id: 'unknown',
  src: 'unknown',
  author: 'unknown',
  subreddit: 'unknown',
  title: 'unknown',
  created_at: 0,
  rating: 0,
  thumb: 'unknown',
  metadata: { width: 0, height: 0, type: 'unknown', mime: 'unknown' },
  size: '0B',
  karma: 0,
  avatar: {
    avatar: 'unknown',
    karma: 0,
  },
};


export const BASE_URL = 'https://oauth.reddit.com';
export const LIMIT = 50;
export const USER_AGENT = 'web:snappub:v0.0.1 (by /u/twene521)';