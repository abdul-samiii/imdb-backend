import mongoose, {model, Schema}  from 'mongoose'

const ChannelSchema = new Schema({
  channelName: {
    type: String,
    required: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  dp: {
    type: String,
    default: 'https://qph.cf2.quoracdn.net/main-qimg-2a71505da53f31610a00104728e19b1b-lq'
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  }
})
const Channel = model('channel', ChannelSchema)
export { Channel }
