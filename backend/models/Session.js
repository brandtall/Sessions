const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: Number,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;