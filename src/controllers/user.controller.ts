import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import bcrypt from "bcrypt";

// Create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, retypePassword } = req.body;
    if (!name || !email || !password || !retypePassword) {
      return res
        .status(400)
        .json({ message: "make sure you fill all the required fields." });
    }
    if (password !== retypePassword) {
      return res.status(400).json({
        message: "the retype password should be the same with password.",
      });
    }
    const find_user = await User.findOne({ email });
    if (find_user) {
      return res.status(409).json({ message: "User already exist." });
    }
    const hash_password = await bcrypt.hash(password, 10);
    const created_user = await User.create({
      name,
      email,
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

const editUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const { name, email, password, retypePassword } = req.body;
    // check if the user is exist
    const find_user = await User.findById(user_id);
    if (!find_user) {
      return res
        .status(404)
        .json({ message: "User not found, try another one." });
    }
    // update the name and email
    if (name) find_user.name = name;
    if (email) find_user.email = email;
    // check if the password is edited and if it's right or not
    if (password) {
      if (!retypePassword) {
        return res
          .status(400)
          .json({ message: "please retype password again." });
      }
      if (password !== retypePassword) {
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
export { createUser, editUser, getUsers, getSpecificUser };
