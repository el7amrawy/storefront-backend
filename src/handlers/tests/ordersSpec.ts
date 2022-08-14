import supertest from "supertest";
import app from "../../server";
import Jwt from "jsonwebtoken";

const request = supertest(app);

const user = {
  first_name: "vbavba",
  last_name: "nkmwwwd",
  password: "vxvxvxvwkk",
};

const product = {
  name: "watch",
  price: 90,
  category: "electronics",
};

const token = Jwt.sign(user, process.env.TOKEN_SECRET as unknown as string);

let order_id: number;

describe("/orders endpoint tests", () => {
  it("create order", async () => {
    await request.post("/users").send(user);
    await request
      .post("/products")
      .set({ Authorization: `test ${token}` })
      .send(product);

    const result = await request
      .post("/users/1/orders")
      .set({ Authorization: `test ${token}` });

    expect(result.body.status.length).toBeGreaterThan(0);
    order_id = result.body.id;
  });

  it("expect server to return an order", async () => {
    const result = await request
      .get(`/users/1/orders/${order_id}`)
      .set({ Authorization: `test ${token}` });
    const order = result.body;

    expect(order.id).toBe(order_id);
  });

  it("expect server to return list of orders", async () => {
    const result = await request
      .get("/users/1/orders")
      .set({ Authorization: `test ${token}` });

    const orders = result.body;
    expect(orders.length).toBeGreaterThan(0);
  });

  it("add product", async () => {
    const result = await request
      .post(`/users/1/orders/${order_id}/products`)
      .send({
        quantity: 5,
        product_id: 1,
      })
      .set({ Authorization: `test ${token}` });

    expect(result.body.quantity).toBe(5);
  });

  it("expext server to return list of products & orders", async () => {
    const result = await request
      .get(`/users/1/orders/${order_id}/products`)
      .set({ Authorization: `test ${token}` });

    expect(result.body.length).toBeGreaterThan(0);
  });
});
