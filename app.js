/** NODE_MODULES */
const express = require('express');
const {json, urlencoded} = require('express');
const cors = require('cors');
const helmet = require('helmet');

/** APP */
const app = express();
app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({extended: true}));

/** ROUTES */
const puzzle = require('./routes/puzzles.js');
app.use('/puzzle', puzzle);
const lichess = require('./routes/lichess.js');
app.use('/lichess', lichess);
const auth = require('./routes/auth.js');
app.use('/auth', auth);

/** START SERVER */
app.listen(3000, () => {
  console.log('Server running on port 3000!');
  // TODO: connect to db, if it doesn't exist create collection…
});
