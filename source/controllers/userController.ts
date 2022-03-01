import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/schema/user";
import bcrypt from "bcrypt";

//Add new user
const addUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserSchema({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      password: hashedPassword,
    });

    res.status(201).json(await user.save(user));
  } catch (err: any) {
    res.status(500).json({ message: err.meessage });
  }
};

export default { addUser };
