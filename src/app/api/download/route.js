'use strict';
const { requestImageStream } = require('../../../services/getImagestream');
const path = require('path');
const { auth } = require('@/auth');

//object for holding the MIME types based on the image extension
const ImageFormats = {
  '.jpg': 'jpeg',
  '.png': 'png',
  '.gif': 'gif',
};

export async function GET(request, response) {
  //extract the url and title of the image from query parameters
  const { title, url } = request.query;

  const session = await auth(request, response);

  if (!session) {
    response.status(401).send('unauthorized');
  }

  //get the extension of the image
  //and wait for query response of the image
  const extension = path.extname(url);
  const format = ImageFormats[extension];
  const imageStream = await requestImageStream(url).catch((e) => {
    console.log('something wrong', e);
  });

  //set HTTP headers to let browser know its for downloading
  //Added a custom header to let the frontend
  //know the image format when downloading
  response.setHeader(
    'Content-Disposition',
    `attachment; filename=${title}${extension}`
  );
  response.setHeader('Content-Type', `image/${format}`);

  response.send(imageStream.data);
}

export const config = {
  api: {
    responseLimit: false,
  },
};
