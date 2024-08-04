'use strict';

import { SubredditListingAPIResponse } from './reddit';

import { auth } from '../auth';
import { BASE_URL, LIMIT, USER_AGENT } from '../utils/constants';

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (
  page: string,
  subreddit: string
): Promise<SubredditListingAPIResponse | undefined> => {
  const session = await auth();
  const headers = new Headers();
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
  const session = await auth();
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${session?.accessToken}`);
  headers.append('User-Agent', USER_AGENT);

  const options = {
    headers: headers,
  };
  try {
    const result = await fetch(`${BASE_URL}/api/info?id=${imageId}`, options);

    if (!result.ok) {
      const errorDetails = await result.json();
      throw new Error(`Error ${result.status}: ${errorDetails.message}`);
    }

    const data = await result.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching image data:', error.message);
      throw new Error(
        `Failed to fetch image data from Reddit: ${error.message}`
      );
    }
  }
};
