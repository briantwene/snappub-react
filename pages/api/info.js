"use strict"

import { fetchInfo } from "../../services/fetchInfo";

export default async function info(req, res) {
    const { imageId } = req.query;

    if (!imageId) {
        res.status(404).send('subreddit could not be found');
    }
    let results = await fetchInfo(imageId);
    //then send to the front end
    res.send(JSON.stringify(results));
}


export async function getOneImage(id) {
    return await fetchInfo(id)
}