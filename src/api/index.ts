import { Request, Response, Router } from "express";
import userRoutes from "../handlers/users";
import productsRoutes from "../handlers/products";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productsRoutes);

routes.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

export default routes;
