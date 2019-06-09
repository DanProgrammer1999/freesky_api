import mongoose from 'mongoose';

const { Schema } = mongoose;

const credentialsSchema = new Schema({
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
  },
  identity: {
    type: Schema.Types.ObjectId,
    ref: 'UserIdentity',
    required: false
  }
});

export default mongoose.model('UserCredentials', credentialsSchema);
