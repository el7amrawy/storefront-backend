import client from "../database";

type Order = {
  id?: string;
  status: string;
  user_id: string;
};

class Orders {
  async index(user_id: Order["user_id"]): Promise<Order[]> {
    const sql = "SELECT * FROM orders WHERE user_id=($1)";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`db error: could'nt get orders ${err}`);
    }
  }

  async show(id: Order["id"], user_id: Order["user_id"]): Promise<Order> {
    const sql = "SELECT * FROM orders WHERE id=($1) AND user_id=($2)";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [id, user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`db error: couldn't create order ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    const sql =
      "INSERT INTO orders (status ,user_id) VALUES ($1,$2) RETURNING *";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`db error: couldn't create order ${err}`);
    }
  }

  async addProduct(quantity: number, order_id: string, product_id: string) {
    const sql =
      "INSERT INTO order_products (quantity ,order_id,product_id) VALUES ($1,$2,$3) RETURNING *";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`db error: couldn't add product ${err}`);
    }
  }
}

export { Order, Orders };
