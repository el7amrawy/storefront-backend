import { Router, Request, Response } from "express";
import { User, Users } from "../models/users";
import Jwt from "jsonwebtoken";
import orederRoutes from "./orders";
import verifyAuthToken from "../services/authorization";

const u = new Users();
const tokenSecret = process.env.TOKEN_SECRET as unknown as string;

const index = async (_req: Request, res: Response) => {
  try {
    const users = await u.index();
    res.json(users);
  } catch (err) {
    res.status(404).json(`unable to get users \n${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const user = await u.show(id);
    res.json(user);
  } catch (err) {
    res.status(404).json(`unable to get user : ${id} \n${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const newUser: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    Object.values(newUser).map((val) => {
      if (val == (undefined || "" || null)) {
        throw new Error("wrong input");
      }
    });
    const user = await u.create(newUser);
    const token = Jwt.sign(user, tokenSecret);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json(`unable to create user ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const id = req.body.id;
  const password = req.body.password;

  try {
    const user = await u.authenticate(id, password);
    if (user != undefined) {
      const token = Jwt.sign(user as unknown as User, tokenSecret);
      res.json({ token, user });
    } else {
      throw new Error("wrong user or password");
    }
  } catch (err) {
    res.status(401).json(`${err}`);
  }
};

const userRoutes = Router();

userRoutes.use("/", orederRoutes);

userRoutes.get("/", verifyAuthToken, index);
userRoutes.get("/:userId", verifyAuthToken, show);
userRoutes.post("/", authenticate);
userRoutes.put("/", create);

export default userRoutes;
