const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  sessionId: Number,
  type: String,
  Restrictions: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;