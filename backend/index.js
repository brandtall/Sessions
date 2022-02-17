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
  console.log(io.sockets)
  socket.on("message", (arg) => {
    io.emit("response", arg);
  })  
  socket.emit("FromAPI", "Hi frontend");

})

server.listen(process.env.PORT);