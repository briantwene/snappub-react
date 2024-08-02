"use strict";
//service for getting requested image data
//import axios
const axios = require("axios");

//function for making a request for the image
exports.requestImageStream = async (url) => {
  const response = await axios
    .get(url, { responseType: "arraybuffer" })
    .catch((e) => {
      console.log(`there has been an error in getting the image data: ${e}`);
    });

  return response;
};
