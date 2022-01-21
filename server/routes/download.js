"use strict";
//import modules
const express = require("express");
const { imageDownloader } = require("../controllers/image-download");

//start express router
let router = express.Router();

//endpoint for user download
router.get("/image", imageDownloader);

module.exports = router;
