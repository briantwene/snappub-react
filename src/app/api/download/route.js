'use strict';
import { requestImageStream } from '../../../services/getImagestream';
import path from 'path';
import { auth } from '../../../auth';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

//object for holding the MIME types based on the image extension
const ImageFormats = {
  '.jpg': 'jpeg',
  '.png': 'png',
  '.gif': 'gif',
};

export async function GET(request) {
  //extract the url and title of the image from query parameters
  const headers = new Headers(request.headers);
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title');
  const url = searchParams.get('url');

  console.log('title', title, 'url', url);
  const session = await auth();

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
  headers.set(
    'Content-Disposition',
    `attachment; filename=${title}${extension}`
  );
  headers.set('Content-Type', `image/${format}`);

  return new NextResponse(imageStream.data, {
    status: 200,
    headers,
  });
}

export const config = {
  api: {
    responseLimit: false,
  },
};
