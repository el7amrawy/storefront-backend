import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET as unknown as string;

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    Jwt.verify(token, tokenSecret);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

export default verifyAuthToken;
