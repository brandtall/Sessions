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

const connectDB = async() => {
  try {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("on");
  }
  catch (err) {
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
  socket.emit("id", socket.id);
  socket.on("makeCall", (arg) => {
    console.log("Ping");
    console.log(arg);
    socket.broadcast.emit("makeCall", arg);
  });
  socket.on("answerCall", (arg) => {
    console.log("Pong");
    console.log(arg.from);
    socket.to(arg.to).emit("answerCall", arg);
  })
  socket.on("new-ice-candidate", (arg) => {
    console.log("Dang");
    socket.to(arg.to).emit("new-ice-candidate", arg);
  });
  socket.on("message", (arg) => {
    io.emit("response", arg);
  })  
  socket.emit("FromAPI", "Hi frontend");

})

server.listen(process.env.PORT);