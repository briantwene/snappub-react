const axios = require('axios');
const image_probe = require('probe-image-size');
const { fetchOne } = require('../models/fetchReddit');
const { defaultImageGenerator } = require('./defaultImageGenerator');
const { getFileSize } = require('./getFileSize');

exports.fetchInfo = async (imageId) => {

  //get the image information
  const aboutWallpaper = await fetchOne(imageId).then(({ data }) => {
    const info = data.children[0].data
    return { url: info.url, author: info.author, subreddit: info.subreddit_name_prefixed, title: info.title, created_at: info.created_utc, rating: info.score }


  })

  console.log("about paper", aboutWallpaper)

  // then get the authors info from that
  // if (option === 'avatar') {
  //   info = await axios
  //     .get(`https://www.reddit.com/user/${author}/about.json`)
  //     .then((response) => {
  //       const {
  //         data: { data },
  //       } = response;

  //       return data.snoovatar_img || defaultImageGenerator();
  //     })
  //     .catch((e) =>
  //       console.log('there was an error in fetching profile data:', e)
  //     );
  //   return info;
  // }
  const info = await axios
    .get(`https://www.reddit.com/user/${aboutWallpaper?.author}/about.json`)
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
};
