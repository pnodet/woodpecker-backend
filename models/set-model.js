/* eslint-disable camelcase */
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
	bestTime: {type: Number},
});

const setSchema = new mongoose.Schema(setDefinition);
const set = mongoose.model('set', setSchema);

const setModel = {
	definition: setDefinition,
	schema: setSchema,
	model: set,
};

export default setModel;
