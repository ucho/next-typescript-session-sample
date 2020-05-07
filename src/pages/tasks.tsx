import * as React from "react";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import type { NextPage, GetServerSideProps } from "next";
import { withSession } from "../lib/withSession";
import { Session } from "../lib/session";
import Router from "next/router";
import tough from "tough-cookie";
import { Task } from "../lib/tasks";

axiosCookieJarSupport(axios);

export const Tasks: NextPage<{ tasks: Task[]; session: Session }> = ({
  tasks,
  session,
}) => {
  const logout: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.status === 200) {
      Router.push("/");
    } else {
      alert("logout failed.");
    }
  };

  return (
    <>
      <h1>Tasks</h1>
      <h3>User: {session.user.id}</h3>
      <p>
        <button onClick={logout}>logout</button>
      </p>
      <ul>
        {tasks.map((task) => (
          <li key={task.content}>{task.content}</li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req }) => {
    const cookieJar = new tough.CookieJar();
    if (req.headers.cookie) {
      cookieJar.setCookieSync(
        req.headers.cookie,
        `http://${req.headers.host}/`
      );
    }
    const tasks: Task[] = await (
      await axios.get(`http://${req.headers.host}/api/tasks`, {
        jar: cookieJar,
        withCredentials: true,
      })
    ).data;
    return { props: { tasks } };
  }
);

export default Tasks;
