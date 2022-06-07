const axios = require('axios');
const bytes = require('bytes');

getFileSize = async (url) => {
  fileSize = await axios
    .head(url)
    .then((data) => {
      return data.headers['content-length'];
    })
    .catch((e) => console.log(e));

  return bytes.format(parseInt(fileSize));
};

module.exports = { getFileSize };
