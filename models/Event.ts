import mongoose, {model, Schema} from 'mongoose'

const EventSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	img:{
    type: String,
		required: true
  },
	channel:{
		type: mongoose.SchemaTypes.ObjectId,
    ref: 'channel'
	}
})

const Event = model('event', EventSchema)
export { Event }
