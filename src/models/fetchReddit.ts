'use strict';
//import snoowarp reddit api wrapper

const axios = require('axios');

const fs = require('fs/promises');
const { auth } = require('../auth');

const BASE_URL = 'https://oauth.reddit.com';
const LIMIT = 50;
const USER_AGENT = 'web:snappub:v0.0.1 (by /u/twene521)';

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (page, subreddit) => {
  const session = await auth();
  const headers = new Headers();
  console.log('session', session);
  headers.append('Authorization', `Bearer ${session?.accessToken}`);
  headers.append('User-Agent', USER_AGENT);

  const options = {
    headers: headers,
  };
  // console.log('next page param', page);
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
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from Reddit');
  }
};

exports.fetchOne = async (imageId) => {
  try {
    const result = await axios.get(`${BASE_URL}/${imageId}.json`);
    return result.data[0];
  } catch (error) {
    console.error('Error fetching image data:', error.message);
    throw new Error('Failed to fetch image data from Reddit');
  }
};