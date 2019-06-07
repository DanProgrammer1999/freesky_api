import mongoose from 'mongoose';

const { Schema } = mongoose;

const flightsSchema = new Schema({
  uav: {
    type: Schema.Types.ObjectId,
    ref: 'UAV',
    required: true
  },
  coordinates: [
    {
      type: String,
      required: false
    }
  ],

  min_height: {
    type: Number,
    required: false
  },
  max_height: {
    type: Number,
    required: false
  },
  main_dates: [{
      type: Date,
      required: false
  }],
  reserved_dates: [{
      type: Date,
      required:false
  }],
  flight_purpose: {
    type: String,
    required: false
  },

  operator: {
      type: Schema.Types.ObjectId,
      ref: 'UserIdentity',
      required: true
  }
});

module.exports = mongoose.model('Flight', flightsSchema);
