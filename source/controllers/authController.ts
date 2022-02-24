import e, { Request, Response, NextFunction } from "express";
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

//authenticate log in credentials + assign access token
const logIn = async (req: Request, res: Response) => {
  const authentication = await authenticate(req, res);

  if (authentication.success != true)
    return res.status(400).json({ message: "Login Failed." });

  const user: User = {
    username: authentication.user?.username as string,
    password: authentication.user?.password as string,
    firstName: authentication.user?.firstName as string,
    lastName: authentication.user?.lastName as string,
    role: authentication.user?.role as string,
    dateCreated: authentication.user?.dateCreated as Number,
    dateUpdated: authentication.user?.dateUpdated as Number,
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  addValidToken(refreshToken);
  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
};

//authenticate access token attached to request
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Authenticating..");

  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader?.split(" ")[1];
  if (token == null)
    return res
      .status(400)
      .json({ user: null, success: false, message: "Token was empty." });

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
      if (err)
        return res
          .status(400)
          .json({ user: user, success: false, message: "Token was invalid." });

      console.log("Token ok");
      next();
    }
  );
};

//generate access token for logged in user
function generateAccessToken(user: User) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
}

//generate refresh token for logged in user
function generateRefreshToken(user: User) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
}

//add new refresh token to list of all valid refresh tokens
const addValidToken = async (token: string) => {
  try {
    const existingToken = await TokenSchema.findOne({ token: token });
    if (existingToken != null) return;

    console.log(token);
    console.log(existingToken);
    const refreshToken = new TokenSchema({
      token: token,
    });

    const saved = await refreshToken.save();
    console.log("SAVED", saved);
  } catch (err) {
    console.log(err);
  }
};

//generate new access token for valid refresh tokens
const getNewAccessToken = async (req: Request, res: Response) => {
  const validToken = await TokenSchema.findOne({ token: req.body.token });
  if (validToken == null)
    return res.status(400).json({ acessssToken: "", success: false });

  jwt.verify(
    req.body.token as string,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, user) => {
      if (err)
        return res.status(400).json({
          acessssToken: "",
          success: false,
        });
      const accessToken = generateAccessToken(user as User);

      return res.status(201).json({
        acessssToken: accessToken,
        success: true,
      });
    }
  );
};

//revoke refresh token
const revokeRefreshToken = async (req: Request, res: Response) => {
  const validToken = await TokenSchema.findOne({ token: req.body.token });
  if (validToken == null)
    return res.status(404).json({ messsage: "Token not found." });

  const revokedToken = await TokenSchema.remove({ token: validToken.token });
  return res.status(201).json({ messsage: "Token successfully revoked." });
};

export default {
  authenticateToken,
  logIn,
  getNewAccessToken,
  revokeRefreshToken,
};
