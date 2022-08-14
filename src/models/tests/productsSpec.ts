import { Product, Products } from "../products";

const p = new Products();
const product: Product = {
  name: "watch",
  price: 90,
  category: "electronics",
};

let id: string;
let category: string;

describe("products model tests", () => {
  it(`expect "create" to return a new product`, async () => {
    const result = await p.create(product);
    expect(product.price).toBe(result.price);

    id = result.id as unknown as string;
  });

  it(`expect "show" to return correct value`, async () => {
    const result = await p.show(id);
    expect(result.name).toBe(product.name);

    category = result.category as unknown as string;
  });

  it(`expect "index" to return atleast one product`, async () => {
    const products = await p.index();
    expect(products[0]).toBeDefined();
  });

  it(`expect "productsByCategory" to return atleast one product`, async () => {
    const products = await p.productsByCategory(category);
    expect(products[0]).toBeDefined;
  });
});
