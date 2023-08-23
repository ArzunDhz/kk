import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  createdFrom: {
    type: String,
    default: "Form",
  },
});

export const UserSchema = mongoose.model("Users", userSchema);
