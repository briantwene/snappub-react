"use strict";
//import needed function
const { getImageData } = require("../services/imageParse");

//controller for requesting images
exports.requestImages = async (req, res) => {
  //get the images
  let results = await getImageData();
  //then send to the front end
  res.send(JSON.stringify(results));
};
