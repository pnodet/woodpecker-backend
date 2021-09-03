import process from 'node:process';
import {config as _config} from 'dotenv';

_config();
const env = process.env;

const db = {
	url: env.DB_URL,
	name: env.DB_NAME,
};

const auth = {
	LICHESS_CLIENT_ID: env.LICHESS_CLIENT_ID,
	LICHESS_CLIENT_SECRET: env.LICHESS_CLIENT_SECRET,
};

export {db, auth};
