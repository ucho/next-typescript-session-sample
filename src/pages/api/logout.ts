import type { NextApiHandler } from "next";
import { removeTokenCookie } from "../../lib/cookies";

const handler: NextApiHandler = (req, res) => {
  removeTokenCookie(res);
  res.status(200).end();
};

export default handler;
