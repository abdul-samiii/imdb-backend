import mongoose, {model, Schema} from 'mongoose'

const PaidMoviesTrailerSchema = new Schema({
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

const PaidMoviesTrailer = model('paidmoviestrailer', PaidMoviesTrailerSchema)
export { PaidMoviesTrailer }
