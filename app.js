/** NODE_MODULES */
const express = require('express');
const {json, urlencoded} = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

/** APP */
const port = 5669
const app = express();
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(session({resave: true, secret: 'SECRET', saveUninitialized: true}));

/** ROUTES */
const puzzle = require('./routes/puzzles.js');
app.use('/puzzle', puzzle);
const lichess = require('./routes/lichess.js');
app.use('/lichess', lichess);
const auth = require('./routes/auth.js');
app.use('/auth', auth);

/** START SERVER */
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
  // TODO: connect to db, if it doesn't exist create collection…
});
