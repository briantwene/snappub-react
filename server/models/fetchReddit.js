"use strict";
//import snoowarp reddit api wrapper
const snoowrap = require("snoowrap");

//enter credentials to setup api
const reddit_api = new snoowrap({
  userAgent: process.env.UA,
  clientId: process.env.ID,
  clientSecret: process.env.SECRET,
  refreshToken: process.env.REFRESH
});

//method for querying api
//for Top 100 Hot posts in r/wallpaper subreddit
exports.fetchData = async () => {
  const result = await reddit_api.getHot("wallpaper", { limit: 100 });
  return result;
};
