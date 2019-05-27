import mongoose from 'mongoose';

const { Schema } = mongoose;

const uavSchema = new Schema({
  producer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  uav_type: {
    type: String,
    required: false
  },
  engine_type: {
      type: String,
      required: false
  },
  engine_number: {
    type: Number,
    required: false
  },
  fuel_type: {
      type: String,
      required: false
  },
  size: [
      {
          type: Number,
          required: false
      }
  ],
  weight: {
      type: Number,
      required: false
  }

});

module.exports = mongoose.model('UAV', uavSchema);
