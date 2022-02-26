import React, { useState } from "react";
import { Stack, Divider, TextField, Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    console.log("submitted");
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
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          color="secondary"
        >
          Get Guest User Credentials
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
