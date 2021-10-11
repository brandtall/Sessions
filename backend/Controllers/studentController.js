const express = require('express');
const Student = require('../models/Student');
const studentRouter = express.Router();

studentRouter.get('/', async(request, response) => {
  const students = await Student.find();
  response.send(students);
});

module.exports = studentRouter;