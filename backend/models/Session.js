const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: Number,
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: 'Instructor'
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;