'use strict';

import { SubredditListingAPIResponse } from './reddit';

import { auth } from '../auth';

const BASE_URL = 'https://oauth.reddit.com';
const LIMIT = 50;
const USER_AGENT = 'web:snappub:v0.0.1 (by /u/twene521)';

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (
  page: string,
  subreddit: string
): Promise<SubredditListingAPIResponse | undefined> => {
  const session = await auth();
  const headers = new Headers();
  console.log('session', session);
  headers.append('Authorization', `Bearer ${session?.accessToken}`);
  headers.append('User-Agent', USER_AGENT);

  const options = {
    headers: headers,
  };

  try {
    const result = await fetch(
      `${BASE_URL}/r/${subreddit}?limit=${LIMIT}&sort=hot`,
      options
    );

    if (!result.ok) {
      const errorDetails = await result.json();
      throw new Error(`Error ${result.status}: ${errorDetails.message}`);
    }

    return await result.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching image data:', error.message);
      throw new Error(
        `Failed to fetch image data from Reddit: ${error.message}`
      );
    }
  }
};

exports.fetchOne = async (imageId: string) => {
  try {
    const result = await fetch(`${BASE_URL}/${imageId}.json`);

    if (!result.ok) {
      const errorDetails = await result.json();
      throw new Error(`Error ${result.status}: ${errorDetails.message}`);
    }

    const data = await result.json();
    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching image data:', error.message);
      throw new Error(
        `Failed to fetch image data from Reddit: ${error.message}`
      );
    }
  }
};
