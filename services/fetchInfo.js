const axios = require('axios');
const image_probe = require('probe-image-size');
const { fetchOne } = require('../models/fetchReddit');
const { defaultImageGenerator } = require('./defaultImageGenerator');
const { getFileSize } = require('./getFileSize');



const getRedditorInfo = async (author) => {
  return await axios
    .get(`https://www.reddit.com/user/${author}/about.json`)
    .then((response) => {
      const {
        data: { data },
      } = response;
      return {
        karma: data.total_karma,
        avatar: data.snoovatar_img || defaultImageGenerator(),

      };
    })
    .catch((e) =>
      console.log('there was an error in fetching profile data:', e)
    );
}

exports.fetchInfo = async (imageId = null, author = null) => {

  if (author) {
    const info = await getRedditorInfo(author)
    return info?.avatar
  } else {
    const aboutWallpaper = await fetchOne(imageId).then(({ data }) => {
      const info = data.children[0].data
      return { url: info.url, author: info.author, subreddit: info.subreddit_name_prefixed, title: info.title, created_at: info.created_utc, rating: info.score }
    })

    const info = getRedditorInfo(aboutWallpaper.author)
    return {
      ...info,
      ...aboutWallpaper,
      size: await getFileSize(aboutWallpaper.url),
      originRes: await image_probe(aboutWallpaper.url)
        .then(({ width, height }) => {
          return { width: width, height: height };
        })
        .catch((e) => {
          `some error: ${e}`;
        }),
    };
  }


};
