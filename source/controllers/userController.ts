import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/schema/user";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authenticate = async (req: Request, res: Response) => {
  let user;
  try {
    user = (await UserSchema.findOne({
      username: req.body.username,
    })) as unknown as User;
    if (user == null) return { user: user, success: false };

    try {
      if (await bcrypt.compare(req.body.password, user.password))
        return { user: user, success: true };
      else return { user: user, success: false };
    } catch (err) {
      return { user: user, success: false };
    }
  } catch (err) {
    return { user: user, success: false };
  }
};

const logIn = async (req: Request, res: Response) => {
  const authentication = await authenticate(req, res);

  if (authentication.success != true)
    return res.status(400).json({ message: "Login Failed." });

  const user = { username: authentication.user?.username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  res.status(200).json({ accessToken: accessToken });
  console.log(accessToken);
};

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

const authenticateToken = async (req: Request, res: Response) => {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader?.split(" ")[1];
  if (token == null)
    return { user: null, success: false, message: "Token is empty." };

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
      if (err)
        return { user: user, success: false, message: "Token was invalid." };

      return {
        user: user,
        success: true,
        message: "Token authenticatin successful",
      };
    }
  );
};

export default { authenticate, addUser, logIn };
