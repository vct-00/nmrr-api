import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/schema/user";
import bcrypt from "bcrypt";

const addUser = async (req: Request, res: Response) => {
  let user;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = new UserSchema({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      password: hashedPassword,
    });
  } catch {
    res.status(500).json({ message: "Failed" });
  }

  try {
    const newUser = await user.save(user);
    res.send({ newUser, status: 201 });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed" });
  }
};

export default { addUser };
