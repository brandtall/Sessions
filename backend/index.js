require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const http = require("http");
const registerRouter = require('./controllers/registerRouter');
const loginRouter = require('./controllers/loginController');
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
app.get('/', (request, response) => {
  response.send("Hello!");
});


app.listen(process.env.PORT, () => {
  console.log("Listening at port " + process.env.PORT);
});

server.listen(3005);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("new user");
  io.emit("FromAPI", "Hi frontend");
  
})