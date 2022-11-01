import mongoose, {model, Schema} from 'mongoose'

const FreeMoviesImageSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	reviews:[{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Reviews'
	}],
	channel:{
		type: mongoose.SchemaTypes.ObjectId,
    ref: 'channel'
	}
})

const FreeMoviesImage = model('freemoviesImage', FreeMoviesImageSchema)
export { FreeMoviesImage }
