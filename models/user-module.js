import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const username = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

username.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_T,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const User = new mongoose.model("User-data", username);
