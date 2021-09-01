/** NODE_MODULES */
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';

/** ROUTES */
import puzzle from './routes/puzzles.js';
import auth from './routes/auth.js';
import lichess from './routes/lichess.js';

app.use('/puzzle', puzzle);
app.use('/lichess', lichess);
app.use('/auth', auth);

/** APP */
const port = 5669;
const app = express();
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(session({resave: true, secret: 'SECRET', saveUninitialized: true}));

/** START SERVER */
app.listen(port, () => {
	console.log(`Server running on port ${port}!`);
	// TODO: connect to db, if it doesn't exist create collection…
});
