const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
var bodyParser = require('body-parser')
const {
  notFound,
  errorHandler
} = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
// app.use(bodyParser.json())
app.use(express.json())

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("server listening on port 4000"));