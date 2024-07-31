'use strict';

const { defaultImageGenerator } = require('../services/defaultImageGenerator');
const { fetchInfo } = require('../services/fetchInfo');

exports.getAuthor = async (req, res) => {
  const { author } = req.query;

  const response = await fetchInfo(author);
  res.send(response);
};
