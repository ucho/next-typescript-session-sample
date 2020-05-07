import React, { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Router from "next/router";

export const Login: NextPage = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const result = await axios.post("/api/login", {
      userID,
      password,
    });
    if (result.status === 200) {
      Router.push("/tasks");
    } else {
      alert("incorrect login.");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" onChange={(e) => setUserID(e.target.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="login" />
      </form>
    </>
  );
};

export default Login;
