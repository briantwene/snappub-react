"use strict";
const { requestImageStream } = require("../services/getImagestream");
const path = require("path");

//object for holding the MIME types based on the image extension
const ImageFormats = {
  ".jpg": "jpeg",
  ".png": "png",
  ".gif": "gif"
};

exports.imageDownloader = async (req, res) => {
  //extract the url and title of the image from query parameters
  const { title, url } = req.query;

  //get the extension of the image
  //and wait for query response of the image
  const extension = path.extname(url);
  const format = ImageFormats[extension];
  const response = await requestImageStream(url).catch((e) => {
    console.log("something wrong", e);
  });

  //set HTTP headers to let browser know its for downloading
  //Added a custom header to let the frontend
  //know the image format when downloading
  res.set({
    "content-disposition": `attachment; filename=${title}${extension}`,
    "content-type": `image/${format}`,
    imgfileName: `${title}${extension}`
  });

  //send the arraybuffer response
  res.send(response.data);
};
