import {Router} from 'express';

/**
 * TODO: add further things to check (e.g. connecting to dababase)
 import queries from '../controllers/db-controller.js';
 */

const router = new Router();

router.get('/', async (_request, response) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	};
	try {
		response.send(healthcheck);
	} catch (error) {
		healthcheck.message = error;
		response.status(503).send();
	}
});
router.get('/database', (_request, res) => {
	let result;
	result === true ? res.send({status: 200}) : res.send({status: 500});
});

export default router;
