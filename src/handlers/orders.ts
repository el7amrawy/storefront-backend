import { Router, Request, Response } from "express";
import { Order, Orders } from "../models/orders";
import Dashbaord from "../services/dashboard";
import verifyAuthToken from "../services/authorization";

const o = new Orders();
const d = new Dashbaord();

const index = async (req: Request, res: Response) => {
  const user_id = req.params.userId;
  try {
    const orders = await o.index(user_id);
    if (orders.length) {
      res.json(orders);
    } else {
      throw new Error("unable to get orders");
    }
  } catch (err) {
    res.status(404).json(`${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.orderId,
    user_id = req.params.userId;

  try {
    const order = await o.show(id, user_id);
    res.json(order);
  } catch (err) {
    res.status(404).json(`couldn't find order id:${id} ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const newOrder: Order = {
    status: "open",
    user_id: req.params.userId,
  };

  try {
    const order = await o.create(newOrder);
    res.json(order);
  } catch (err) {
    res.status(400).json(`couldn't make order ${err}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const quantity = req.body.quantity,
    order_id = req.params.orderId,
    product_id = req.body.product_id;

  try {
    const result = await o.addProduct(quantity, order_id, product_id);
    res.json(result);
  } catch (err) {
    res.status(400).json(`couldn't add product ${err}`);
  }
};

const userOrders = async (req: Request, res: Response) => {
  const user_id = req.params.userId;

  try {
    const orders = await d.userOrders(user_id);
    res.json(orders);
  } catch (err) {
    res.status(404).json({ err });
  }
};

const orederRoutes = Router();

orederRoutes.get("/:userId/orders", verifyAuthToken, index);
orederRoutes.put("/:userId/orders/", verifyAuthToken, create);
orederRoutes.get("/:userId/orders/:orderId", verifyAuthToken, show);
orederRoutes.put(
  "/:userId/orders/:orderId/products",
  verifyAuthToken,
  addProduct
);
orederRoutes.get(
  "/:userId/orders/:orderId/products",
  verifyAuthToken,
  userOrders
);

export default orederRoutes;
