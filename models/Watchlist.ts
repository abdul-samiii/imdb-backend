import mongoose, {model, Schema} from 'mongoose'

const WatchlistSchema = new Schema({
	freeVideo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'freemoviestrailer'
  },
  paidVideo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'paidmoviestrailer'
  }
})

const Watchlist = model('watchlist', WatchlistSchema)
export { Watchlist }
