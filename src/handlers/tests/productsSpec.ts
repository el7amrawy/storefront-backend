import supertest from "supertest";
import app from "../../server";
import Jwt from "jsonwebtoken";

const req = supertest(app);

const product = {
  name: "watch",
  price: 90,
  category: "electronics",
};
const token = Jwt.sign(product, process.env.TOKEN_SECRET as unknown as string);
let id: string;

describe("/products endpoint tests", () => {
  it("expect server to create a product", async () => {
    const res = await req
      .put("/products")
      .set({ Authorization: `test ${token}` })
      .send(product);

    expect(res.body.name).toBe(product.name);
    id = res.body.id;
  });

  it("expect server to return a product", async () => {
    const res = await req.get(`/products/${id}`);

    expect(res.body.price).toBe(product.price);
  });

  it("expect server to return list of products", async () => {
    const res = await req.get("/products");

    expect(res.body.length).toBeGreaterThan(0);
  });

  it("expect server to return list of products filtered by category", async () => {
    const res = await req
      .post("/products")
      .send({ category: product.category });

    expect(res.body.length).toBeGreaterThan(0);
  });
});
