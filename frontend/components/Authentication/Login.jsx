import React, { useState } from "react";
import { Stack, Divider, TextField, Button } from "@mui/material";
import { BACKEND_END_POINT } from "../utils/endpoints";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const res = await fetch(`${BACKEND_END_POINT}/api/user/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
        router.push("/chats");
      }
    } catch (error) {}
  };

  return (
    <div>
      <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <TextField
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />{" "}
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />{" "}
        <Button variant="contained" onClick={() => handleSubmit()}>
          Login{" "}
        </Button>{" "}
        <Button
          variant="contained"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          color="secondary"
        >
          Get Guest User Credentials{" "}
        </Button>{" "}
      </Stack>{" "}
    </div>
  );
};

export default Login;
