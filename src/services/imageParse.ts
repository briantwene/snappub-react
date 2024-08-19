'use strict';
//import modules and functions needed

const { fetchData } = require('../models/fetchReddit');
const { fetchInfo, getRedditorInfo } = require('./fetchInfo');
import {
  RawWallpaper,
  RawWallpaperContainer,
  SubredditListingAPIResponse,
  SubredditResponseModel,
  Wallpaper,
} from '../models/reddit';
import { generateThumbnail, getMetadata } from '../utils/utils';
const skipKeywords = ['gallery', 'imgur.com/a/', 'www.reddit.com/r/'];

//function for getting the data out of each submisson
const extractor = (image: RawWallpaper): Promise<Wallpaper> => {
  //return a promise that gets the data out of the submission on resolving
  return new Promise(async (resolve) => {
    resolve({
      author: image.author,
      id: image.id,
      avatar: await getRedditorInfo(image.author),
      src: image.url,
      thumb: await generateThumbnail(image.url),
      title: image.title,
      rating: image.score,
      created_at: image.created_utc,
      metadata: await getMetadata(image.url),
    });
  });
};

//helper function for extracting the images from the raw data
const extractImages = async (postData: RawWallpaperContainer[]) => {
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
export const getImageData = async (
  page: string,
  subreddit: string
): Promise<SubredditResponseModel> => {
  //await the helper functions for the extracted data
  const imageData: SubredditResponseModel = await fetchData(page, subreddit)
    .then(async (result: SubredditListingAPIResponse) => {
      const postData = result.data.children;
      return {
        next: result.data.after,
        prev: result.data.before,
        posts: await extractImages(postData),
      };
    })
    .catch((e: Error) => {
      if (e instanceof Error)
        console.log(
          'something went wrong in getting extracting the images',
          e.message
        );
    });
  //retrun this to then calling function

  console.log('imageData', imageData);
  return imageData;
};
