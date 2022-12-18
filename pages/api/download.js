"use strict";
const { requestImageStream } = require("../../services/getImagestream");
const path = require("path");

//object for holding the MIME types based on the image extension
const ImageFormats = {
    ".jpg": "jpeg",
    ".png": "png",
    ".gif": "gif"
};

export default async function download(req, res) {
    //extract the url and title of the image from query parameters
    const { title, url } = req.query;

    //get the extension of the image
    //and wait for query response of the image
    const extension = path.extname(url);
    const format = ImageFormats[extension];
    const response = await requestImageStream(url).catch((e) => {
        console.log("something wrong", e);
    });

    //set HTTP headers to let browser know its for downloading
    //Added a custom header to let the frontend
    //know the image format when downloading
    res.setHeader(
        "Content-Disposition", `attachment; filename=${title}${extension}`,
    );
    res.setHeader(
        "Content-Type", `image/${format}`
    );

    res.send(response.data);
};

export const config = {
    api: {
        responseLimit: false,
    },
}