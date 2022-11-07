import mongoose, { model, mongo, Schema } from 'mongoose'

const ReviewsSchema = new Schema({
	ratings: {
		type: Number,
		default: 0,
	},
	comment:{
		type: String,
		default: '-'
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user'
	},
	trailer: {
		type: Boolean,
		required: true
	},
	trailerId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'freemoviestrailer'
	},
	imageId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'freemoviesimage'
	}
})
const Reviews = model('review', ReviewsSchema)
export { Reviews }