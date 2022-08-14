import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
  ENV,
  POSTGRES_TEST_DB,
} = process.env;

let db: string = "";

const st = ENV?.replace(/\s/g, "");

if (st == "dev") {
  db = POSTGRES_DB as unknown as string;
} else if (st == "test") {
  db = POSTGRES_TEST_DB as unknown as string;
}

const client = new pg.Pool({
  host: POSTGRES_HOST,
  database: db,
  port: POSTGRES_PORT as unknown as number,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
