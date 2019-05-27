import mongoose from 'mongoose';

const { Schema } = mongoose;

const controllerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserCredentials', controllerSchema);
