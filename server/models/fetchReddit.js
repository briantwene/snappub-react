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
  //const result = await reddit_api.getHot('wallpaper', { limit: 100 });
  const result = await axios
    .get(`https://www.reddit.com/r/${subreddit}.json?limit=100&after=${page}`)
    .then(({ data }) => data);

  await fs.writeFile('data.json', JSON.stringify(result, null, 2));

  return result;
};
