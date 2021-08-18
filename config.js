const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const config = {
  db: {
    url: env.DB_URL,
  },
};

module.exports = config;
