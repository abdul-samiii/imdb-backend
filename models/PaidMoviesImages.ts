import mongoose, {model, Schema} from 'mongoose'

const PaidMoviesImageSchema = new Schema({
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

const PaidMoviesImage = model('paidmoviesImage', PaidMoviesImageSchema)
export { PaidMoviesImage }
