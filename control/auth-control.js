import bcrypt from "bcryptjs";
import { User } from "../models/user-module.js";

// Registration logic

export const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const SaltRound = await bcrypt.genSalt(10);
    const Hash_password = await bcrypt.hash(password, SaltRound);
    const data = await User.create({
      username,
      email,
      password: Hash_password,
    });

    res.status(200).json({
      status: 200,
      message: "success",
      token: await data.generateToken(),
      userId: await data._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "server error" });
  }
};

// Login logic

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Email or password" });
    }

    const PassMatch = await bcrypt.compare(password, userExist.password);

    if (PassMatch) {
      res.status(200).json({
        status: 200,
        message: "Login successful",
        Token: await userExist.generateToken(),
        userId: await userExist._id.toString(),
        data: await userExist,
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Email or password" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "page not found" });
  }
};

// user logic
export const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from user route ${error}`);
  }
};