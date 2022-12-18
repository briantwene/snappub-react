'use strict';
//import modules and functions needed
const image_probe = require('probe-image-size');
const { fetchData } = require('../models/fetchReddit');
const { fetchInfo } = require('./fetchInfo');
import getFileSize from './getFileSize';
const { decode } = require('html-entities');
const skipKeywords = ['gallery', 'imgur.com/a/', 'www.reddit.com/r/'];
const reso = [
  {
    width: 2560,
    height: 1080,
    aspect: '21:9',
  },
  {
    width: 3440,
    height: 1440,
    aspect: '21:9',
  },
  {
    width: 5120,
    height: 2160,
    aspect: '21:9',
  },
  {
    width: 1280,
    height: 720,
    aspect: '16:9',
  },
  {
    width: 1366,
    height: 768,
    aspect: '16:9',
  },
  {
    width: 1600,
    height: 900,
    aspect: '16:9',
  },
  {
    width: 1920,
    height: 1080,
    aspect: '16:9',
  },
  {
    width: 2560,
    height: 1440,
    aspect: '16:9',
  },
  {
    width: 3840,
    height: 2160,
    aspect: '16:9',
  },
  {
    width: 5120,
    height: 2880,
    aspect: '16:9',
  },
  {
    width: 7680,
    height: 4320,
    aspect: '16:9',
  },
  {
    width: 1280,
    height: 800,
    aspect: '16:10',
  },
  {
    width: 1920,
    height: 1200,
    aspect: '16:10',
  },
  {
    width: 2560,
    height: 1080,
    aspect: '16:10',
  },
  {
    width: 1400,
    height: 1050,
    aspect: '4:3',
  },
  {
    width: 1440,
    height: 1080,
    aspect: '4:3',
  },
  {
    width: 1600,
    height: 1200,
    aspect: '4:3',
  },
  {
    width: 1920,
    height: 1440,
    aspect: '4:3',
  },
  {
    width: 2048,
    height: 1536,
    aspect: '4:3',
  },
];

//function for getting the data out of each submisson
const extractor = (image) => {
  //return a promise that gets the data out of the submission on resolving
  return new Promise(async (resolve) => {
    resolve({
      author: image.author,
      id: image.id,
      pic: image.url,
      thumb: decode(image.preview.images[0].resolutions[0].url),
      title: image.title,
      rating: image.score,
      created_at: image.created_utc,
      originRes: await image_probe(image.url)
        .then(({ width, height }) => {
          return { width: width, height: height };
        })
        .catch((e) => {
          `some error: ${e}`;
        }),
    });
  });
};

//helper function for extracting the images from the raw data
const extractImages = async (postData) => {
  // array for keeping the list of promises
  const promises = [];
  //loop through the array of post objects
  for (const post of postData) {
    // check for if the image links have the keywords in the array
    //if it does then skip to the next submission
    const image = post.data;
    if (image.url.startsWith('https://i.redd.it/')) {
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

  //retrun this array to the calling function
  return extractedImages;
};

//method for getting the data from the images
export const getImageData = async (page, subreddit) => {
  //await the helper functions for the extracted data
  const imageData = await fetchData(page, subreddit)
    .then(async (result) => {
      const postData = result.data.children;
      return {
        next: result.data.after,
        prev: result.data.before,
        data: await extractImages(postData),
      };
    })
    .catch((e) => {
      console.log('something went wrong in getting extracting the images', e);
    });
  //retrun this to then calling function
  return imageData;
};
