const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/chats", (req, res) => {
  res.send({ test: "app" });
});

app.listen(PORT, console.log("server listening on port 4000"));
