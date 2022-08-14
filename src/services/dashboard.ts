import client from "../database";
import { Order } from "../models/orders";

class Dashboard {
  async userOrders(user_id: Order["user_id"]): Promise<Object> {
    const sql =
      "SELECT user_id,order_id,status, product_id,quantity FROM order_products INNER JOIN orders ON orders.id=order_products.order_id WHERE user_id=($1)";

    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      const orders = result.rows;
      conn.release();

      return orders;
    } catch (err) {
      throw new Error(`db error: ${err}`);
    }
  }
}

export default Dashboard;
