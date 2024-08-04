'use strict';
//import needed function
import { getImageData } from '../../../services/imageParse';

import { auth } from '../../../auth';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  console.log('session', session);

  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const subreddit = searchParams.get('subreddit');

  console.log('page', page, 'subreddit', subreddit);

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  } else {
    // TODO: Make sure to check for page when infinite scrolling is implemented
    if (!subreddit) {
      return NextResponse.json(
        {},
        { status: 404, statusText: 'Subreddit not found or page' }
      );
    }
    let results = await getImageData('', subreddit);

    //then send to the front end
    return NextResponse.json(results, { status: 200 });
  }
}
