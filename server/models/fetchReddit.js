'use strict';
//import snoowarp reddit api wrapper
const snoowrap = require('snoowrap');
const axios = require('axios');

const fs = require('fs/promises');

//enter credentials to setup api
const reddit_api = new snoowrap({
  userAgent: process.env.UA,
  clientId: process.env.ID,
  clientSecret: process.env.SECRET,
  refreshToken: process.env.REFRESH,
});

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (page, subreddit) => {
  const result = await axios
    .get(`https://www.reddit.com/r/${subreddit}.json?limit=20&after=${page}`)
    .then(({ data }) => data);
  console.log(result.data);
  return result;
};
