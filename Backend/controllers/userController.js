import express from "express";

import User from "../models/User.js";

const userRouter = express.Router();
userRouter.get('/', async(request, response) => {
  const users = await User.find().populate('courses');
  response.send(users);
});

export default userRouter;