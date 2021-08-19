import mongoose from 'mongoose';
const {Schema} = mongoose;

const puzzleDefinition = new Schema({
  initial_fen: {type: String},
  moves_uci: {type: String},
  rating: {type: Number},
  rating_deviation: {type: Number},
  popularity: {type: Number},
  num_plays: {type: Number},
  puzzle_themes: {type: String},
  game_url: {type: String},
});

let PuzzleSchema = new mongoose.Schema(puzzleDefinition);
let Puzzle = mongoose.model('Puzzle', PuzzleSchema);

module.exports = {
  definition: puzzleDefinition,
  schema: PuzzleSchema,
  model: Puzzle,
};
