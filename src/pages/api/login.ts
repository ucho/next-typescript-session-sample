import { encryptSession } from "../../lib/session";
import { setTokenCookie } from "../../lib/cookies";
import type { NextApiHandler } from "next";
import { find } from "../../lib/users";

const handler: NextApiHandler = async (req, res) => {
  const { userID, password } = req.body;
  const user = await find(userID);

  if (!password || !user || user.password !== password) {
    res.status(401).end();
    return;
  }

  const token = await encryptSession({ user });
  setTokenCookie(res, token);
  res.end();
};

export default handler;
