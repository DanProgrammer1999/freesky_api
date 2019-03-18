import mongoose from "mongoose";

const { Schema } = mongoose;

const controllerSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Controller", controllerSchema);
