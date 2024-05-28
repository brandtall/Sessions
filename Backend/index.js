require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const http = require("http");
const registerRouter = require('./controllers/registerRouter');
const loginRouter = require('./controllers/loginController');
const sessionRouter = require('./controllers/sessionController');
const cors = require('cors');
const socketIo = require("socket.io");
const userRouter = require('./controllers/userController');
const app = express();
const server = http.createServer(app);

// TODO replace console logs with proper logging

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("on");
    } catch (err) {
        console.error(err);
    }
}
connectDB();
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/session', sessionRouter);
app.get('/', (request, response) => {
    response.send("Hello!");
});

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
});
io.on("connection", (socket) => {
    console.log("Socket connected");
    socket.emit("id", socket.id);
    socket.on("initCall", (arg) => {
        socket.broadcast.emit("callRequest", arg);
    });
    socket.on("makeCall", (arg) => {
        socket.to(arg.to).emit("makeCall", arg);
    });
    socket.on("answerCall", (arg) => {
        socket.to(arg.to).emit("answerCall", arg);
    });
    socket.on("message", (arg) => {
        io.emit("response", arg);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("closeCall", socket.id);
    })
    socket.emit("FromAPI", "Hi Frontend");

})

server.listen(process.env.PORT);