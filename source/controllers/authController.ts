import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import UserSchema from "../models/schema/user";
import TokenSchema from "../models/schema/token";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//authenticate log in credentials
const authenticate = async (req: Request, res: Response) => {
  let user;
  try {
    user = (await UserSchema.findOne({
      username: req.body.username,
    })) as unknown as User;

    if (user === null) throw Error("User not found");

    return {
      user: user,
      success: await bcrypt.compare(req.body.password, user.password),
    };
  } catch (err: any) {
    return { user: user, success: false, message: err.message };
  }
};

//authenticate log in credentials + assign access token
const logIn = async (req: Request, res: Response) => {
  const authentication: any = await authenticate(req, res);

  if (!authentication.success)
    return res.status(401).json({ message: "Login Failed." });

  var user: User = authentication.user;
  user.password = undefined;

  const accessToken = generateAccessToken(user);
  addValidToken(accessToken);
  res.status(200).json({ accessToken: accessToken });
};

//generate access token for logged in user
function generateAccessToken(user: any) {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET as string);
}

//add access token to list of valid tokens
const addValidToken = async (token: string) => {
  try {
    const accessToken = new TokenSchema({
      token: token,
    });
    return await accessToken.save();
  } catch (err: any) {
    return false;
  }
};

//validate token to authorize request
const authorizeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader?.split(" ")[1];

  try {
    if (token === null) throw Error("Empty token");

    const validToken = await TokenSchema.findOne({ token: token });
    if (validToken === null) throw Error("Invalid token");

    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

//revoke access token onLogout: remove access token from list of valid tokens
const revokeAccessToken = async (req: Request, res: Response) => {
  try {
    await TokenSchema.remove({ token: req.body.token });
    return res.status(201).json({ messsage: "Token successfully revoked." });
  } catch (err: any) {
    return res.status(500).json({ messsage: err.message });
  }
};

export default {
  authorizeToken,
  logIn,
  revokeAccessToken,
};
