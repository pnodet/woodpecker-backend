import {Router} from 'express';

const router = Router();

/** POST : Create a new user */ 
router.post('/', async (req, res) => {
  //check if user already exists
  const testUser = await findOne({email: req.body.email});
  if (testUser) res.status(400).send('Email already used')

  // else
  user = new User();
});

export default router;
