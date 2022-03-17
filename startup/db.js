require('dotenv/config');
const mongoose = require('mongoose');

const connection = function connect() {
  try {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true
    });
    console.log('connected to DB');
  } catch (err) {
    console.log('Exiting from thrown error', err);
    process.exit(1);
  }
};

module.exports = connection;