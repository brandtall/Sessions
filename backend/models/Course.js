const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  courseId: {
    type: Number,
    required: true,
    unique: true
  },
  section: {
    type: Number,
    default: 01
  },
});
courseSchema.plugin(uniqueValidator);

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course