import { serialize, parse } from "cookie";
import type { NextApiRequest } from "next";
import type { IncomingMessage, OutgoingMessage } from "http";

const TOKEN_NAME = "token";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export const setTokenCookie = (res: OutgoingMessage, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: OutgoingMessage) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const parseCookies = (req: IncomingMessage | NextApiRequest) => {
  // For API Routes we don't need to parse the cookies.
  if ("cookies" in req) return req.cookies;

  // For pages we do need to parse the cookies.
  const { cookie } = req.headers;
  return parse(cookie || "");
};

export const getTokenCookie = (req: IncomingMessage) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
