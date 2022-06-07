require('dotenv').config();
//import modules and routes
const express = require('express');
const app = express();
const api = require('./routes/api.js');
const download = require('./routes/download.js');
const info = require('./routes/info');
const path = require('path');

const port = process.env.PORT || 3001;

//set up routes for fetching images for the frontend
// app.use(express.urlencoded({ extended: "false" }));
// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api', api);
app.use('/download', download);
app.use('/info', info);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

//set the server to listen on the following port
app.listen(port, (err) => {
  if (err) {
    return console.log('ERR', err);
  }

  console.log(`listening on port ${port}`);
});
