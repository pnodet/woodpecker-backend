import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const config = {
  db: {
    url: env.DB_URL,
  },
};

export default config;
