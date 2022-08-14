import { User, Users } from "../users";

const u = new Users();

const user: User = {
  first_name: "Ahmed",
  last_name: "Hady",
  password: "nmkjdcbkjsd34",
};

describe("users model tests", () => {
  let id: string;

  it(`expect "create" to return a new user`, async () => {
    const result = await u.create(user);
    expect(user.first_name).toEqual(result.first_name);

    id = result.id as unknown as string;
  });

  it(`expect "show" to return correct value`, async () => {
    const result = await u.show(id);
    expect(user.first_name).toEqual(result.first_name);
  });

  it(`expect "index" to return atleast one user`, async () => {
    const users = await u.index();
    expect(users[0]).toBeDefined();
  });

  it("password hashing", async () => {
    const result = await u.create(user);
    expect(result.password).not.toEqual(user.password);
  });
});
