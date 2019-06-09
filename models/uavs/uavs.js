import mongoose from "mongoose";

const { Schema } = mongoose;

const uavSchema = new Schema({
  serial_number: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  photo_ability: {
    type: String,
    required: false
  },
  model: {
    type: Schema.Types.ObjectId,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'UserIdentity'
  }
});

export default mongoose.model("UAV", uavSchema);
