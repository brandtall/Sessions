const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const instructorSchema = new mongoose.Schema({
  name: String,
  instructorId: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});
instructorSchema.plugin(uniqueValidator);

instructorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
})

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;