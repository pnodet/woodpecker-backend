import mongoose from 'mongoose';

const {Schema} = mongoose;

const userDefinition = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	permissionLevel: Number,
});

const userSchema = new mongoose.Schema(userDefinition);
const user = mongoose.model('user', userSchema);

const userModel = {
	definition: userDefinition,
	schema: userSchema,
	model: user,
};

export default userModel;
