require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const studentRouter = require('./controllers/studentController')
const registerRouter = require('./controllers/registerRouter');
const loginRouter = require('./controllers/loginController');
const cors = require('cors');
const app = express();

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
app.use('/students', studentRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.get('/', (request, response) => {
  response.send("Hello!");
});


app.listen(process.env.PORT, () => {
  console.log("Listening at port " + process.env.PORT);
});
