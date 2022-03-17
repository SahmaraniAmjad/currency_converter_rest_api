const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000

const allRouters = require('./routes/all.routes');
// connect to Mongo db
require('./startup/db.js')();
require('dotenv/config');

// parse the body 
app.use(bodyParser.json());
// use a middleware
app.use(allRouters.routes);

// Run the server 
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});


