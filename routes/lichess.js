/* eslint-disable no-warning-comments */
import fetch from 'node-fetch';
import ndjson from 'ndjson';
import {Router} from 'express';

import {findOne, insertOne} from '../controllers/db-controller.js';
import AppError from '../utils/app-error.js';

const router = new Router();

router.get('/games', async (request, response) => {
	const username = request.query.username.toLowerCase();
	// Switch to new URL Search Params ?
	const {
		max = '100',
		token,
		rated = 'true',
		perfType = 'blitz,rapid,classical',
	} = request.query;

	let url = ` https://lichess.org/api/games/user/${username}?max=${max}&rated=${rated}&perfType${perfType}&pgnInJson=true`;

	if (token) {
		url += `&token=${token}`;
	}

	const result = await fetch(url, {
		headers: {Accept: 'application/x-ndjson'},
	});

	result.body
		.pipe(ndjson.parse())
		.on('data', async (item) => {
			const isInDB = await findOne({game_id: item.id}, 'games');
			if (isInDB === null) {
				let color;
				if (item.players.white.user.name.toLowerCase() === username)
					color = 'white';
				if (item.players.black.user.name.toLowerCase() === username)
					color = 'black';

				// FIXME: check player color
				const gameObject = {
					game_id: item.id,
					user: username,
					color,
					pgn: item.pgn,
					analyzed: false,
				};

				insertOne(gameObject, 'games');
			} else {
				console.log('Game : ' + item.id + ' is in db');
			}
		})
		.on('pause', () => {
			console.log('pause');
		})
		.on('end', () => {
			response.send({status: 200});
		})
		.on('error', (error) => {
			console.log(new AppError(error));
		});
});

export default router;
