'use strict';
//import snoowarp reddit api wrapper

const axios = require('axios');

const fs = require('fs/promises');

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (page, subreddit) => {
  const result = await axios
    .get(`https://www.reddit.com/r/${subreddit}.json?limit=75&after=${page}`)
    .then(({ data }) => data);
  console.log(result.data);
  return result;
};
