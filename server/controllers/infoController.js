'use strict';

const axios = require('axios');

exports.getAuthor = async (req, res) => {
  const { author } = req.query;

  const response = await axios
    .get(`https://www.reddit.com/user/${author}/about.json`)
    .then((response) => {
      const {
        data: { data },
      } = response;
      console.log(data);
      return {
        karma: data.total_karma,
        avatar: data.snoovatar_img || data.icon_img,
        name: data.name,
      };
    })
    .catch((e) => console.log('there was an error:', e));
  ('');
  res.send(response);
};
