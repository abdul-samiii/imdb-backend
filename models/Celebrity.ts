import mongoose, {model, Schema} from 'mongoose'

const CelebritySchema = new Schema({
	name:{
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

const Celebrity = model('celebrity', CelebritySchema)
export { Celebrity }
