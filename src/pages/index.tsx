import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { withSession } from "../lib/withSession";

export const Index: NextPage = () => <></>;

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, res }) => {
    res.writeHead(302, { location: `http://${req.headers.host}/tasks` });
    res.end();
    return { props: {} };
  }
);

export default Index;
