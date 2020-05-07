export type User = {
  id: string;
  password: string;
};

const users: User[] = [{ id: "1234", password: "1234" }];

export const find = async (id: string) => {
  return users.find((user) => user.id === id);
};
