import { Request, Response, NextFunction } from 'express'

import { Channel, Watchlist } from '../models'

// ADD MOVIE TRAILER
export const AddWatchlistTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { trailerID, channel, type } = req.body
    console.log(trailerID, channel, type)
    const channelExist = await Channel.find({channel})
    const watchlist_free = await Watchlist.find({freeVideo: trailerID})
    const watchlist_paid = await Watchlist.find({paidVideo: trailerID})

    if (channelExist[0] != null && watchlist_free[0] == null && watchlist_paid[0] == null) {
      if (type === 'free') {
        Watchlist.create({
          type: type,
          freeVideo: trailerID
        })
      } else if (type === 'paid') {
        Watchlist.create({
            type: type,
            paidVideo: trailerID
          })
      }
          
          return res.status(200).json({"message": "Trailer added Successfully"})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

// GET MOVIE TRAILER
export const GetWatchlistTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel, type } = req.body
    const channelExist = await Channel.find({channel})

    if (channelExist[0] != null) {
      const watchlistData = await Watchlist.find().populate('paidVideo').populate({path:'freeVideo', populate:[{path:'channel'}, {path: 'reviews'}]})
          
      return res.status(200).json({"message": "Watchlist Fetched Successfully", "watchlistData": watchlistData})
    } else {
      return res.status(403).json({"message": "Something went wrong"})
    }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

//DELETE MOVIE TRAILER
export const DeleteWatchlistTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel, type } = req.headers
    const { trailerID } = req.params
    const channelExist = await Channel.find({channel})

    if (channelExist[0] != null) {
      if (type === 'free') {
        await Watchlist.deleteOne({freeVideo: trailerID})
      } else if (type === 'paid') {
        await Watchlist.deleteOne({paidVideo: trailerID})
      }
          
      return res.status(200).json({"message": "Trailer Removed from watchlist"})
    } else {
      return res.status(403).json({"message": "Something went wrong"})
    }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}