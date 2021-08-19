import mongoose from 'mongoose';
const {Schema} = mongoose;

const userDefinition = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});

let userSchema = new mongoose.Schema(userDefinition);
let user = mongoose.model('user', userSchema);

module.exports = {
  definition: userDefinition,
  schema: userSchema,
  model: user,
};
