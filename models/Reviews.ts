import mongoose, { model, Schema } from 'mongoose'

const ReviewsSchema = new Schema({
	ratings: {
		type: Number,
		default: 0
	},
	comments:{
		type: String,
		default: '-'
	}
})
const Reviews = model('reviews', ReviewsSchema)
export { Reviews }