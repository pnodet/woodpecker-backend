const queries = require('../controllers/dbController.js');
const fetch = require('node-fetch');
const ndjson = require('ndjson');
const {Router} = require('express');
const router = Router();

router.get('/games', async function (req, res) {
  const username = req.query.username.toLowerCase();
  // Switch to new URL Search Params ?
  const {
    max = '100',
    token,
    rated = 'true',
    perfType = 'blitz,rapid,classical',
  } = req.query;

  let url = ` https://lichess.org/api/games/user/${username}?max=${max}&rated=${rated}&perfType${perfType}&pgnInJson=true`;

  if (token) {
    url = url + `&token=${token}`;
  }

  const response = await fetch(url, {
    headers: {Accept: 'application/x-ndjson'},
  });

  response.body
    .pipe(ndjson.parse())
    .on('data', async item => {
      const isInDB = await queries.findOne({game_id: item.id}, 'games');
      if (isInDB === null) {
        let color;
        if (item.players.white.user.name.toLowerCase() == username)
          color = 'white';
        if (item.players.black.user.name.toLowerCase() == username)
          color = 'black';

        // FIXME: check player color
        const gameObject = {
          game_id: item.id,
          user: username,
          color,
          pgn: item.pgn,
          analyzed: false,
        };

        queries.insertOne(gameObject, 'games');
      } else {
        console.log('Game : ' + item.id + ' is in db');
      }
    })
    .on('pause', () => {
      console.log('pause');
    })
    .on('end', () => {
      res.send({status: 200});
    })
    .on('error', err => {
      console.log(err);
    });
});

module.exports = router;
