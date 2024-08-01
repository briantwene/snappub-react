'use strict';
//import needed function
import { getImageData } from '../../../services/imageParse';

import { auth } from '../../../auth';

import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = await auth();
  const user = session?.user;

  const page = request.query?.page;
  const subreddit = request.query?.subreddit;

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  } else {
    if (!subreddit || !page) {
      return NextResponse.json(
        { error: 'Subreddit could not be found' },
        { status: 404 }
      );
    }
    let results = await getImageData(page, subreddit);
    //then send to the front end
    return NextResponse.json(results, { status: 200 });
  }
}
