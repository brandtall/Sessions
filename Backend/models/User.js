import uniqueValidator from "mongoose-unique-validator";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Course'
    }
  ],
  userType: {
      type: String,
      required: true,
      enum: {values: ["Instructor", "Student"], message: '{VALUE} is not supported' }
  }
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString();
  delete returnedObject.__v;
  delete returnedObject._id;
  delete returnedObject.passwordHash;
  }
})

const User = mongoose.model('User', userSchema);

export default User;