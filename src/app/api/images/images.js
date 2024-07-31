'use strict';
//import needed function
import { getImageData } from '../../../services/imageParse';

import { auth } from '@/auth';

export default async function images(req, res) {
  const session = await auth(req, res);
  const { page, subreddit } = req.query;

  if (!session) {
    res.status(401).send('unauthorized');
  } else {
    if (!subreddit) {
      res.status(404).send('subreddit could not be found');
    }
    let results = await getImageData(page, subreddit);
    //then send to the front end
    res.send(JSON.stringify(results));
  }
}