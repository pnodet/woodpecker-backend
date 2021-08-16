import {Router} from 'express';
const router = Router();

router.get('/', async (_req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

// TODO: add further things to check (e.g. connecting to dababase)
import * as queries from '../controllers/dbController.js';
router.get('/createDB', (_req, res) => {
  const result = queries.createDB();
  result === true ? res.send({status: 200}) : res.send({status: 500});
});

export default router;
