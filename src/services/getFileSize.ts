const axios = require('axios');
const bytes = require('bytes');

export const getFileSize = async (url) => {
  const fileSize = await axios
    .head(url)
    .then((data) => {
      return data.headers['content-length'];
    })
    .catch((e) => console.log(e));

  return bytes.format(parseInt(fileSize));
};

