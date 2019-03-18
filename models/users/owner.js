import mongoose from "mongoose";

const { Schema } = mongoose;

const ownerSchema = new Schema({
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
  },
  uavs: [
    {
      type: Schema.Types.ObjectId,
      ref: "UAV"
    }
  ]
});

module.exports = mongoose.model("Owner", ownerSchema);
