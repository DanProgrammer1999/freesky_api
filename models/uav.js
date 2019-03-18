import mongoose from "mongoose";

const { Schema } = mongoose;

const uavSchema = new Schema({
  serial_id: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner"
  }
});

module.exports = mongoose.model("UAV", uavSchema);
