const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const userId = request.body.userId;
  const password = request.body.password;
  const student = await Student.findOne({studentId: userId});
  const instructor = await Instructor.findOne({instructorId: userId});
  const user = student ? student : instructor ? instructor : null;
  console.log(user)
  if (!user) {
    response.status(400).json({error: "User ID is incorrect"});
  }
  const passwordHash = user.passwordHash;
  const compare = await bcrypt.compare(password, passwordHash);
  if(!compare) {
    response.json({error: "Password is incorrect"});
  }
  const token = jwt.sign({user}, process.env.PRIVATE_KEY, {expiresIn: '1h'});
  response.status(200).json({token})
})

module.exports = loginRouter;