import Iron from "@hapi/iron";
import { getTokenCookie } from "./cookies";
import type { IncomingMessage } from "http";
import { User } from "./users";

// Use an environment variable here instead of a hardcoded value for production
const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters";

export type Session = {
  user: User;
};

export const encryptSession = async (session: Session) => {
  return await Iron.seal(session, TOKEN_SECRET, Iron.defaults);
};

export const getSession = async (req: IncomingMessage) => {
  const token = getTokenCookie(req);
  if (!token) return null;
  return (await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)) as Session;
};
