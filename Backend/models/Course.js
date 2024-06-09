import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

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
    default: 0o1
  },
  availableSession: {
    type: mongoose.Types.ObjectId,
    ref: 'Session'
  }
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

export default  Course