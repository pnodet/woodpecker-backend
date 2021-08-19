import mongoose from 'mongoose';
const {Schema} = mongoose;

const gameDefinition = new Schema({
  game_id: {
    type: Number,
    unique: true,
    lowercase: true,
    required: true,
  },
  user: {
    type: String,
    unique: true,
    required: true,
  },
  color: String,
  pgn,
  analyzed: Boolean,
  timestamps: true,
});

let GameSchema = new mongoose.Schema(gameDefinition);
let Game = mongoose.model('Game', GameSchema);

module.exports = {
  definition: gameDefinition,
  schema: GameSchema,
  model: Game,
};
