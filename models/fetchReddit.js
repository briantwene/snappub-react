'use strict';
//import snoowarp reddit api wrapper

const axios = require('axios');

const fs = require('fs/promises');

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async (page, subreddit) => {

  console.log("next page param", page)
  const result = await axios
    .get(`https://www.reddit.com/r/${subreddit}.json?limit=30&after=${page}`)
    .then(({ data }) => data);

  return result;
};


exports.fetchOne = async (imageId) => {
  const result = await axios
    .get(`https://www.reddit.com/${imageId}.json`)
    .then(({ data }) => data[0]);

  return result;
}
