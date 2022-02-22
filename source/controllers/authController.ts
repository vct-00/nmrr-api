import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = async (req: Request, res: Response) => {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader?.split(" ")[1];
  if (token == null)
    return { user: null, success: false, message: "Token was empty." };

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
      if (err)
        return { user: user, success: false, message: "Token was invalid." };

      return {
        user: user,
        success: true,
        message: "Token authentication successful",
      };
    }
  );
};
