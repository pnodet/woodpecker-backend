/** NODE_MODULES */
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import helmet from 'helmet';

/** APP */
const app = express();
app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({extended: true}));

/** ROUTES */
import puzzle from './routes/puzzles.js';
app.use('/puzzle', puzzle);
import lichess from './routes/lichess.js';
app.use('/lichess', lichess);
import auth from './routes/auth.js';
app.use('/auth', auth);

/** START SERVER */
app.listen(3000, () => {
  console.log('Server running on port 3000!');
  // TODO: connect to db, if it doesn't exist create collection…
});
