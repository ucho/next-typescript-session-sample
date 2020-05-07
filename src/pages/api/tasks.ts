import type { NextApiHandler } from "next";
import { requireSession } from "../../lib/withSession";
import { getSession } from "../../lib/session";
import { find } from "../../lib/tasks";

const handler: NextApiHandler = requireSession(async (req, res) => {
  const session = await getSession(req);
  if (!session || !session.user) {
    res.status(404).end();
    return;
  }
  const { user } = session;
  const tasks = await find(user);
  res.json(tasks);
  res.end();
});

export default handler;
