import { Router, Request, Response } from "express";
import { Product, Products } from "../models/products";
import verifyAuthToken from "../services/authorization";

const p = new Products();

const index = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await p.index();
    res.json(products);
  } catch (err) {
    res.status(404).json({ err });
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product: Product = await p.show(id);
    if (product != undefined) {
      res.json(product);
    } else {
      throw new Error("product not found");
    }
  } catch (err) {
    res.status(404).json(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    Object.values(newProduct).map((val) => {
      if (val == (undefined || "" || null)) {
        throw new Error("wrong input");
      }
    });
    const product: Product = await p.create(newProduct);
    res.json(product);
  } catch (err) {
    res.status(400).json(`unable to create product ${err}`);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  const category = req.body.category as unknown as string;

  try {
    if (category.length) {
      const products = await p.productsByCategory(category);
      res.json(products);
    } else {
      throw new Error("wrong input");
    }
  } catch (err) {
    res.status(404).json(`unable to get products ${err}`);
  }
};

const productsRoutes = Router();

productsRoutes.get("/", index);
productsRoutes.get("/:id", show);
productsRoutes.post("/", verifyAuthToken, create);
productsRoutes.post("/category", productsByCategory);

export default productsRoutes;
