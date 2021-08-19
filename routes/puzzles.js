const {Router} = require('express');
const queries = require('../controllers/dbController.js');

const router = Router();

// Get a puzzle from an id
router.get('/:id', async (_req, _res) => {});

// Get mutiple puzzles from an array of id
router.post('/many/:ids', async (_req, _res) => {});

// Create new set of puzzle
router.get('/set', async (_req, _res) => {

  // try to find 25 puzzles (not already in a set ?) of this user in the db

  // if it is not possible, add new games from the user to the db then analyze

  // create a object ? or an array ?
  const set = {
    puzzles: ['_id-01', '_id-02', '_id-03'],
    numberOfPuzzle,
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

// Make the set larger ?
router.get('/set', async (_req, _res) => {

  // what is the length of the set

  // if it is not max then add puzzles to the set ?

});

module.exports = router;
