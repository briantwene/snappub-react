'use strict';
//import needed function
import { getImageData } from '../../services/imageParse';

export default async function images(req, res) {
    const { page, subreddit } = req.query;

    if (!subreddit) {
        res.status(404).send('subreddit could not be found');
    }
    let results = await getImageData(page, subreddit);
    //then send to the front end
    res.send(JSON.stringify(results));
}