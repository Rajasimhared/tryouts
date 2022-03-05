const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("server listening on port 4000"));