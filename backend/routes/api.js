//import modules and controllers
const express = require("express");
const { requestImages } = require("../controllers/image-request");
let router = express.Router();

//route /images for fetching images for the frontend
router.get("/images", requestImages);

module.exports = router;
