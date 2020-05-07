import { User } from "./users";

export type Task = {
  content: string;
  owner: string;
};

const tasks: Task[] = [
  { content: "wake up", owner: "1234" },
  { content: "take breakfast", owner: "1234" },
  { content: "sleep", owner: "1234" },
];

export const find = async (owner: User) => {
  return tasks.filter((task) => task.owner === owner.id);
};
