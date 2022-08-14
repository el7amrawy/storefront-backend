import client from "../database";

type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

class Products {
  async index(): Promise<Product[]> {
    const sql = "SELECT * FROM products";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql);
      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`db error: couldn't get products ${err}`);
    }
  }

  async show(id: Product["id"]): Promise<Product> {
    const sql = "SELECT * FROM products WHERE id=($1)";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`db error: couldn't get product id:${id}\n ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    const sql =
      "INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`db error: couldn't create product ${err}`);
    }
  }

  async productsByCategory(category: Product["category"]): Promise<Product[]> {
    const sql = "SELECT * FROM products WHERE category=($1)";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [category]);
      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`db error: couldn't get products ${err}`);
    }
  }
}
export { Product, Products };
