'use strict';

import { fetchInfo } from '../../../services/fetchInfo';
import { auth } from '@/auth';

export async function GET(request, response) {
  const { imageId } = request.query;
  const session = await auth(request, response);

  if (!session) {
    response.status(401).send('unauthorized');
  }

  if (!imageId) {
    response.status(404).send('subreddit could not be found');
  }
  let results = await fetchInfo(imageId);
  //then send to the front end
  response.send(JSON.stringify(results));
}

export async function getOneImage(id) {
  return await fetchInfo(id);
}
