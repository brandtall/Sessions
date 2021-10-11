const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});
studentSchema.plugin(uniqueValidator);

studentSchema.set('toJSON', {
transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString();
  delete returnedObject.__v;
  delete returnedObject._id;
  delete returnedObject.passwordHash;
  }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;