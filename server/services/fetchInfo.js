const axios = require('axios');
const { defaultImageGenerator } = require('./defaultImageGenerator');

exports.fetchInfo = async (author, option) => {
  let info;
  if (option === 'avatar') {
    info = await axios
      .get(`https://www.reddit.com/user/${author}/about.json`)
      .then((response) => {
        const {
          data: { data },
        } = response;
        console.log(data);
        return data.snoovatar_img || defaultImageGenerator();
      })
      .catch((e) =>
        console.log('there was an error in fetching profile data:', e)
      );
    return info;
  }
  info = await axios
    .get(`https://www.reddit.com/user/${author}/about.json`)
    .then((response) => {
      const {
        data: { data },
      } = response;
      console.log(data);
      return {
        karma: data.total_karma,
        avatar: data.snoovatar_img || defaultImageGenerator(),
        name: data.name,
      };
    })
    .catch((e) =>
      console.log('there was an error in fetching profile data:', e)
    );

  return info;
};
