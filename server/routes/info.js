"use strict";
const express = require("express");
const { getAuthor } = require("../controllers/infoController");
const router = express.Router();

router.get("/author", getAuthor);
//router.get("/image");
module.exports = router;
