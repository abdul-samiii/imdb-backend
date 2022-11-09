import mongoose, {model, mongo, Schema} from 'mongoose'

const WatchlistSchema = new Schema({
	freeVideo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'freemoviestrailer'
  },
  paidVideo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'paidmoviestrailer'
  },
  user:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  }
})

const Watchlist = model('watchlist', WatchlistSchema)
export { Watchlist }
