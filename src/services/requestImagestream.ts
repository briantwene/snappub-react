"use strict";
//service for getting requested image data
//import axios


//function for making a request for the image
export const requestImageStream = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(
        'Error fetching image stream: {response.status} - {response.statusText}'
      );

    const stream = await response.arrayBuffer();
    return stream;
  } catch (error) {
    throw error;
  }
};
