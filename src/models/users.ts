import client from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD as unknown as string;
const rounds = parseInt(process.env.SALT_ROUNDS as unknown as string);

type User = {
  id?: string;
  first_name: string;
  last_name: string;
  password: string;
};

class Users {
  async index(): Promise<User[]> {
    const sql = "SELECT * FROM users";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`db error: couldn't get users \n${err}`);
    }
  }

  async show(id: User["id"]): Promise<User> {
    const sql = "SELECT * FROM users WHERE id=($1)";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`db error: couldn't get user \n${err}`);
    }
  }

  async create(user: User): Promise<User> {
    const hash = bcrypt.hashSync(user.password + pepper, rounds);
    const sql =
      "INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) RETURNING *";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`db error: couldn't create user -> ${user} \n ${err}`);
    }
  }

  async authenticate(
    id: User["id"],
    password: User["password"]
  ): Promise<User | null> {
    const sql = "SELECT * from users where id=($1)";
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rowCount) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`db error: ${err}`);
    }
  }
}

export { User, Users };
