import mongoose from 'mongoose';
const {Schema} = mongoose;

const gameSchema = new Schema({
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

module.exports = mongoose.model('Games', gameSchema);