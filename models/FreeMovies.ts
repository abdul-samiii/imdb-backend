import mongoose, {model, Schema} from 'mongoose'

const FreeMoviesSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	duration: {
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

const FreeMovies = model('freemovies', FreeMoviesSchema)
export { FreeMovies }
