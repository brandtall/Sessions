const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  StudentId: Number
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;