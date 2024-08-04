'use strict';
import { requestImageStream } from '../../../services/requestImagestream';
import path from 'path';
import { auth } from '../../../auth';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';


export async function GET(request: NextRequest) {
  //extract the url and title of the image from query parameters
  const headers = new Headers(request.headers);
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') ?? '';
  const url = searchParams.get('url') ?? '';
  const extension = searchParams.get('extension') ?? '';
  const mime = searchParams.get('mime') ?? '';

 
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  //get the extension of the image
  //and wait for query response of the image
  const imageStream = await requestImageStream(url);

  //set HTTP headers to let browser know its for downloading
  //Added a custom header to let the frontend
  //know the image format when downloading
  headers.set(
    'Content-Disposition',
    `attachment; filename=${title}.${extension}`
  );
  headers.set('Content-Type', `image/${mime}`);

  return new NextResponse(imageStream, {
    status: 200,
    headers,
  });
}

