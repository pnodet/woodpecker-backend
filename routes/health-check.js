import {Router} from 'express';

// TODO: add further things to check (e.g. connecting to dababase)
import queries from '../controllers/db-controller.js';

const router = Router();

router.get('/', async (_request, res) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	};
	try {
		res.send(healthcheck);
	} catch (error) {
		healthcheck.message = error;
		res.status(503).send();
	}
});
router.get('/database', (_request, res) => {
	let result;
	result === true ? res.send({status: 200}) : res.send({status: 500});
});

export default router;
