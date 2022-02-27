import React, { useState, useEffect } from "react";
import {
  Stack,
  Divider,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import Router from "next/router";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open]);

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    try {
      const { data } = await fetch("http://localhost:4000/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          pic,
        }),
      }).then((res) => res.json());

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      Router.push("/chats");
    } catch (error) {}
    console.log("submitted");
  };

  const postDetails = (val) => {
    const data = new FormData();
    data.append("file", val);
    data.append("upload_preset", "tryouts");
    data.append("cloud_name", "reddytryouts");
    fetch("https://api.cloudinary.com/v1_1/reddytryouts/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(val);
    setPic(val);
  };

  const toast = ({ title, status } = obj) => {
    console.log(title, status);
    return (
      <Collapse in={open}>
        <Alert severity={status} variant="filled">
          {title}
        </Alert>
      </Collapse>
    );
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
        />{" "}
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
        <TextField
          name="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />{" "}
        <Button
          variant="contained"
          component="label"
          style={{
            width: "40%",
          }}
        >
          Upload Your Picture{" "}
          <input
            type="file"
            hidden
            onChange={(e) => postDetails(e.target.files[0])}
          />{" "}
        </Button>{" "}
        <Button variant="contained" onClick={() => handleSubmit()}>
          Sign Up{" "}
        </Button>{" "}
      </Stack>{" "}
    </div>
  );
};

export default Signup;
