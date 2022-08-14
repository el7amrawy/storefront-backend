import { Order, Orders } from "../orders";

const o = new Orders();

const order: Order = {
  status: "open",
  user_id: "1",
};

describe("orders model tests", () => {
  it("create order", async () => {
    const result = await o.create(order);
    expect(result).toBeDefined();
  });

  it("add product", async () => {
    const result = await o.addProduct(6, "1", "1");
    expect(result).toBeDefined();
  });
});
