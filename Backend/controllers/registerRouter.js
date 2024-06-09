import express from "express";

import bcrypt from "bcrypt";

import Course from "../models/Course.js";

import User from "../models/User.js";

const registerRouter = express.Router();

registerRouter.post('/student', async (request, response) => {
  try {
    const studentId = request.body.userId;
    const name = request.body.name;
    const courses = request.body.courses;
    const password = request.body.password;
    const saltRounds = 10;
    const passwordHash = password ? await bcrypt.hash(password, saltRounds) : null;
    const student = new User({
        name,
        userId: studentId,
        passwordHash,
        courses,
        userType: "Student"
      });
      const savedStudent = await student.save();
      response.json({ savedStudent });
  }
  catch (err) {
    console.log(err);
  }
});

registerRouter.post('/instructor', async (request, response) => {
  try {
    const instructorId = request.body.userId;
    const name = request.body.name;
    const courses = request.body.courses;
    const password = request.body.password;
    const saltRounds = 10;
    const passwordHash = password ? await bcrypt.hash(password, saltRounds) : null;
    const instructor = new User({
      name,
      userId: instructorId,
      passwordHash,
      courses,
      userType: "Instructor"
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

export default registerRouter;