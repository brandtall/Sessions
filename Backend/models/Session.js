import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
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

sessionSchema.plugin(uniqueValidator);

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Session = mongoose.model('Session', sessionSchema);

export default Session;