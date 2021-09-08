import {Router} from 'express';
import {findOne} from '../controllers/db-controller.js';

const router = new Router();

class User {
	constructor(length) {
		this.puzzles = ['_id-01', '_id-02', '_id-03'];
		this.numberOfPuzzle = length;
		this.tries = 0;
		this.successRate = 0;
		this.bestTime = 0;
	}
}

/** POST : Create a new user */
router.post('/', async (request, response) => {
	// Check if user already exists
	const testUser = await findOne({email: request.body.email});
	if (testUser) response.status(400).send('Email already used');

	// Else
	const user = new User(1);
	console.log(user);
});

export default router;
