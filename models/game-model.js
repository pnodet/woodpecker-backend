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
	pgn: String,
	analyzed: Boolean,
	timestamps: true,
});

const GameSchema = new mongoose.Schema(gameDefinition);
const Game = mongoose.model('Game', GameSchema);

gameModel = {
	definition: gameDefinition,
	schema: GameSchema,
	model: Game,
};

export default gameModel;
