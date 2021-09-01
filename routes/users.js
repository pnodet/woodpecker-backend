import {Router} from 'express';

const router = Router();

/** POST : Create a new user */
router.post('/', async (request, response) => {
	// Check if user already exists
	const testUser = await findOne({email: request.body.email});
	if (testUser) response.status(400).send('Email already used');

	// Else
	const user = new User();
});

export default router;
