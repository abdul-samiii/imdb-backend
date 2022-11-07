import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: '-'
  },
  content_creator:{
    type: Boolean,
    default: false
  },
  pro: {
    type: Boolean,
    default: false
  },
  reviews: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'review'
  }],
  channel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'channel'
  }
})
const User = model('user', UserSchema)
export {User}
