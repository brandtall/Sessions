import {App, initializeApp} from "./app";

import http from "http";

import socket from "socket.io";
import {connectDB} from "./connectDB.js";

require('dotenv').config()
let app = App();
const server = http.createServer(app);

// TODO replace console logs with proper logging

connectDB();

initializeApp(app);

const io = socket(server, {
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