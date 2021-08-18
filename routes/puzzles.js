const {Router} = require('express');
const queries = require('../controllers/dbController.js');

const router = Router();

// Create new set of puzzle
router.get('/set', async (_req, _res) => {

  // try to find 25 puzzles (not already in a set ?) of this user in the db

  // create a object ? or an array ?
  const set = {
    puzzles: ['_id-01', '_id-02', '_id-03'],
    tries: 3,
    successRate,
    bestTime,
  };

  // save it in DB

});

// Update a player's set (change best time, change number of try…) 
router.put('/set', async (_req, _res) => {});

// Get user last played set ?
router.get('/set:UserId', async (_req, _res) => {});


module.exports = router;
