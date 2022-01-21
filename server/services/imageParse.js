"use strict";
//import modules and functions needed
const image_probe = require("probe-image-size");
const { fetchData } = require("../models/fetchReddit");
const skipKeywords = ["gallery", "imgur.com/a/"];
const reso = [
  {
    width: 2560,
    height: 1080,
    aspect: "21:9"
  },
  {
    width: 3440,
    height: 1440,
    aspect: "21:9"
  },
  {
    width: 5120,
    height: 2160,
    aspect: "21:9"
  },
  {
    width: 1280,
    height: 720,
    aspect: "16:9"
  },
  {
    width: 1366,
    height: 768,
    aspect: "16:9"
  },
  {
    width: 1600,
    height: 900,
    aspect: "16:9"
  },
  {
    width: 1920,
    height: 1080,
    aspect: "16:9"
  },
  {
    width: 2560,
    height: 1440,
    aspect: "16:9"
  },
  {
    width: 3840,
    height: 2160,
    aspect: "16:9"
  },
  {
    width: 5120,
    height: 2880,
    aspect: "16:9"
  },
  {
    width: 7680,
    height: 4320,
    aspect: "16:9"
  },
  {
    width: 1280,
    height: 800,
    aspect: "16:10"
  },
  {
    width: 1920,
    height: 1200,
    aspect: "16:10"
  },
  {
    width: 2560,
    height: 1080,
    aspect: "16:10"
  },
  {
    width: 1400,
    height: 1050,
    aspect: "4:3"
  },
  {
    width: 1440,
    height: 1080,
    aspect: "4:3"
  },
  {
    width: 1600,
    height: 1200,
    aspect: "4:3"
  },
  {
    width: 1920,
    height: 1440,
    aspect: "4:3"
  },
  {
    width: 2048,
    height: 1536,
    aspect: "4:3"
  }
];

//function for getting the data out of each submisson
const extractor = (image) => {
  //return a promise that gets the data out of the submission on resolving
  return new Promise(async (resolve) => {
    resolve({
      author: image.author.name,
      pic: image.url,
      title: image.title,
      rating: image.score,
      originRes: await image_probe(image.url)
        .then(({ width, height }) => {
          return { width: width, height: height };
        })
        .catch((e) => {
          `some error: ${e}`;
        })
    });
  });
};

//helper function for extracting the images from the raw data
const extractImages = async (postData) => {
  // array for keeping the list of promises
  const promises = [];
  //loop through the array of post objects
  for (const image of postData) {
    // check for if the image links have the keywords in the array
    //if it does then skip to the next submission
    if (!skipKeywords.some((word) => image.url.includes(word))) {
      //put the promises returned in to the array called promieses
      promises.push(extractor(image));
    } else {
      continue;
    }
  }
  //wait for all the promises in the array to resolve
  //when resoved it will return an object
  //with the information needed for each image post
  const extractedImages = await Promise.all(promises);
  console.log(extractedImages);
  //retrun this array to the calling function
  return extractedImages;
};

//method for getting the data from the images
exports.getImageData = async () => {
  //await the helper functions for the extracted data
  const imageData = await fetchData()
    .then((result) => extractImages(result))
    .catch((e) => {
      console.log("something went wrong in getting extracting the images", e);
    });
  console.log(imageData);
  //retrun this to then calling function
  return imageData;
};
