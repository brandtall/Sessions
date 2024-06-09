import User from "../models/User.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import express from "express";

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const userId = request.body.userId;
  const password = request.body.password;
  const user = await User.findOne({ userId }).populate('courses');
  if (!user) {
    response.json({ error: "User ID is incorrect" });
  } else {
    const passwordHash = user.passwordHash;
    const compare = await bcrypt.compare(password, passwordHash);
    if (!compare) {
      response.json({ error: "Password is incorrect" });
    } else {
      const token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
      response.status(200).json({ user, token, courses: user.courses })
    }
  }

})

export default loginRouter;