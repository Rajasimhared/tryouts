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

const server = app.listen(PORT, console.log("server listening on port 4000"));
const io = require("socket.io")(
    server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000"
        }
    }
)

io.on("connection", (socket) => {
    console.log('connected to socket')
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit('connected')
    })
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log('joined room', room);
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

    socket.on("new message", (newMessage) => {
        var chat = newMessage.chat
        if (!chat.users) return console.log('chat.users not defined')
        chat.users.forEach(user => {
            if (user._id === newMessage.sender._id) return;
            socket.in(user._id).emit("message received", newMessage);
        })
    })
})