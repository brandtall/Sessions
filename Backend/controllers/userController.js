const express = require('express');
const User = require('../models/User');
const userRouter = express.Router();
userRouter.get('/', async(request, response) => {
  const users = await User.find().populate('courses');
  response.send(users);
});

module.exports = userRouter;