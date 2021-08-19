import mongoose from 'mongoose';
const {Schema} = mongoose;

const setDefinition = new Schema({
  set_id: {
    type: Number,
    unique: true,
    lowercase: true,
    required: true,
  },
  puzzles: {type: Array},
  length: {type: Number},
  tries: {type: Number},
  successRate: {type: Number},
  bestTime:{type: Number},
});

let setSchema = new mongoose.Schema(setDefinition);
let set = mongoose.model('set', setSchema);

module.exports = {
  definition: setDefinition,
  schema: setSchema,
  model: set,
};
