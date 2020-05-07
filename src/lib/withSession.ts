import type { GetServerSideProps, NextApiHandler } from "next";
import { getSession } from "./session";

export const withSession = (
  wrappedHandler: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    const { req, res } = ctx;
    const session = await getSession(req);
    if (!session) {
      res.writeHead(302, { Location: `http://${req.headers.host}/login` });
      res.end();
      return { props: {} };
    }
    const { props } = await wrappedHandler(ctx);
    return { props: { session, ...props } };
  };
};

export const requireSession = (
  wrappedHandler: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    const session = await getSession(req);
    if (!session) {
      res.status(403).end();
      return;
    }
    wrappedHandler(req, res);
  };
};
