import React, { useState } from "react";
import { Stack, Divider, TextField, Button } from "@mui/material";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const handleSubmit = () => {
    console.log("submitted");
  };

  const postDetails = (val) => {
    setPic(val);
  };

  return (
    <div>
      <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <TextField
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
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
        <TextField
          name="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />
        <Button variant="contained" component="label" style={{ width: "40%" }}>
          Upload Your Picture
          <input
            type="file"
            hidden
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Sign Up
        </Button>
      </Stack>
    </div>
  );
};

export default Signup;
