import * as queries from '../controllers/dbController.js';
import fetch from 'node-fetch';
import ndjson from 'ndjson';
import {Router} from 'express';
const router = Router();

router.get('/games', async function (req, res) {
  const username = req.query.username.toLowerCase();
  const {max, token} = req.query;
  const url =
    'https://lichess.org/api/games/user/' +
    username +
    '?max=' +
    max +
    '&token=' +
    token +
    '&rated=true&perfType=blitz,rapid,classical&pgnInJson=true';

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

export default router;
