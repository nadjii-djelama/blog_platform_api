import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envconfig.config.ts";

// Create user
const signUp = async (req: Request, res: Response) => {
  try {
    const { user_name, email, password, retype_password, role } = req.body;
    if (!user_name || !email || !password || !retype_password || !role) {
      return res
        .status(400)
        .json({ message: "make sure you fill all the required fields." });
    }
    if (password !== retype_password) {
      return res.status(400).json({
        message: "the retype password should be the same with password.",
      });
    }
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(403).json({
          message: "You can't get the admin user again.",
        });
      }
    }
    const find_user = await User.findOne({ email });
    if (find_user) {
      return res.status(409).json({ message: "User already exist." });
    }
    const hash_password = await bcrypt.hash(password, 10);
    const created_user = await User.create({
      user_name,
      email,
      role,
      password: hash_password,
    });
    return res
      .status(201)
      .json({ message: "user Created", user: created_user });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "internet server Error.", error: err.message });
  }
};

// Login form
const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message:
          "make sure you fill the email and password and retype password fields.",
      });
    }
    const find_user = await User.findOne({ email });
    if (!find_user) {
      return res.status(404).json({ message: "User not found." });
    }
    const password_validation = await bcrypt.compare(
      password,
      find_user.password
    );
    if (!password_validation) {
      return res.status(401).json({ message: "Invalid credeantials." });
    }
    const token = await jwt.sign(
      { userId: find_user._id, email: find_user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({ message: "you're Logged in.", user: find_user, Token: token });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

// Edit user
const editUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const { user_name, email, password, retype_password } = req.body;
    // check if the user is exist
    const find_user = await User.findById(user_id);
    if (!find_user) {
      return res
        .status(404)
        .json({ message: "User not found, try another one." });
    }
    // update the name and email
    if (user_name) find_user.user_name = user_name;
    if (email) find_user.email = email;
    // check if the password is edited and if it's right or not
    if (password) {
      if (!retype_password) {
        return res
          .status(400)
          .json({ message: "please retype password again." });
      }
      if (password !== retype_password) {
        return res.status(400).json({
          message: "please retyped password is the same with password.",
        });
      }
      const hashed_pass = await bcrypt.hash(password, 10);
      find_user.password = hashed_pass;
    }
    // final step - save everything
    const new_user = await find_user.save();
    return res
      .status(200)
      .json({ message: " User edited succesfuly", user: new_user });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(201).json({ users });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get specific user
const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const find_user = await User.findById(user_id);
    if (!find_user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: find_user });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    if (!user_id)
      return res.status(401).json({ message: "provide a valid user ID." });
    const find_user = await User.findByIdAndDelete(user_id);
    if (!find_user)
      return res
        .status(404)
        .json({ message: "user doesn't exist, try again." });
    res.status(200).json({ message: "User deleted.", user: find_user.id });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
export { signUp, editUser, getUsers, deleteUser, getSpecificUser, logIn };
