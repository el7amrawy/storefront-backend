import express from "express";
import routes from "./api";

const app: express.Application = express();

app.use(express.json());
app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  process.stdout.write(`servert started at http://localhost:${3000}\n`);
});

export default app;
