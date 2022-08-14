import supertest from "supertest";
import { User } from "../../models/users";
import app from "../../server";

const request = supertest(app);

describe("/users endpoint tests", () => {
  const user: User = {
    first_name: "qasem",
    last_name: "nkmd",
    password: "dmnnkl2jnk2l",
  };
  let id: number;
  it("expect server to create a user", async () => {
    const res = await request.put("/users").send(user);

    expect(res.body.user).toBeDefined;
    id = res.body.user.id;
  });

  let token: string;

  it("expect server to return a token", async () => {
    const res = await request.post("/users").send({
      id: id,
      password: user.password,
    });

    expect(res.body.token).not.toBe(undefined);
    token = res.body.token;
  });

  it("expect server to return a user", async () => {
    const res = await request
      .get(`/users/${id}`)
      .set({ Authorization: `test ${token}` });

    expect(res.body.last_name).not.toBe(undefined);
  });

  it("expect server to return list of users", async () => {
    const res = await request
      .get("/users")
      .set({ Authorization: `test ${token}` });
    expect(res.body.length).toBeGreaterThan(0);
  });
});
