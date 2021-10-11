const express = require('express');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const registerRouter = express.Router();

registerRouter.post('/student', async (request, response) => {
  try {
    const studentId = request.body.studentId;
    const name = request.body.name;
    const password = request.body.password;
    const saltRounds = 10;
    const passwordHash = password ? await bcrypt.hash(password, saltRounds) : null;
    const student = new Student({
        name,
        studentId,
        passwordHash
      });
      console.log(student);
      const savedStudent = await student.save();
      response.json({ savedStudent });
  }
  catch (err) {
    console.log(err);
  }
});

registerRouter.post('/instructor', async (request, response) => {
  try {
    const instructorId = request.body.instructorId;
    const name = request.body.name;
    const password = request.body.password;
    const saltRounds = 10;
    const passwordHash = password ? await bcrypt.hash(password, saltRounds) : null;
    const instructor = new Instructor({
      name,
      instructorId,
      passwordHash
    });
    const savedInstructor = await instructor.save();
    response.json({ savedInstructor });
  } catch (err) {
    console.log(err);
  }
});

registerRouter.post('/course', async (request, response) => {
  try {
  const title = request.body.title;
  const courseId = request.body.courseId;
  const section = request.body.section;
  const course = new Course({
    title,
    courseId,
    section
  });
  const savedCourse = await course.save();
  response.status(200).json({savedCourse});
  } catch (err) {
    console.log(err);
  }
});

module.exports = registerRouter;