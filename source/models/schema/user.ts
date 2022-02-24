import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now,
  },
  dateUpdated: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
export default User;
