const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const config = {
  db: {
    url: env.DB_URL,
    name: env.DB_NAME,
  },
  auth: {
    LICHESS_CLIENT_ID: env.LICHESS_CLIENT_ID,
    LICHESS_CLIENT_SECRET: env.LICHESS_CLIENT_SECRET,
  },
};

module.exports = config;
