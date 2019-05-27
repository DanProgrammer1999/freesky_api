import mongoose from 'mongoose';

const { Schema } = mongoose;

const controllerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  paternal_name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  passport: {
    type: String,
    required: true
  },
  uavs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UAV',
      required: false
    }
  ],

  credentials: {
    type: Schema.Types.ObjectId,
    ref: 'UserCredentials'
  }
});

module.exports = mongoose.model('UserIdentity', controllerSchema);
