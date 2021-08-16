import {dotenv} from 'dotenv';
import {Router} from 'express';
const router = Router();

router.get('/login', async (_req, _res) => {});
router.get('/callback', async (_req, _res, _next) => {});
router.get('/logout', async (_req, _res) => {});

export default router;
