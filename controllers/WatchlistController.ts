import { Request, Response, NextFunction } from 'express'

import { Channel, Watchlist } from '../models'

// ADD MOVIE TRAILER
export const AddWatchlistTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { trailerID, channel, type, userID } = req.body
    console.log(trailerID, channel, type)
    const channelExist = await Channel.find({channel})
    const watchlist_free = await Watchlist.find({freeVideo: trailerID, user: userID})
    const watchlist_paid = await Watchlist.find({paidVideo: trailerID, user: userID})

    if (channelExist[0] != null && watchlist_free[0] == null && watchlist_paid[0] == null) {
      if (type === 'free') {
        Watchlist.create({
          type: type,
          freeVideo: trailerID,
          user: userID,
        })
      } else if (type === 'paid') {
        Watchlist.create({
            type: type,
            paidVideo: trailerID,
            user: userID,
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
  const { userid } = req.headers
  console.log('here : ',userid)
  try {
    const { channel, type } = req.body
    const channelExist = await Channel.find({channel})

    if (channelExist[0] != null) {
      const watchlistData = await Watchlist.find({user: userid}).populate('paidVideo').populate({path:'freeVideo', populate:[{path:'channel'}, {path: 'reviews'}]})
          
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
    console.log(trailerID)
    const channelExist = await Channel.find({channel})
    let trailerExist
    if (type === 'free') {
      trailerExist = await Watchlist.find({freeVideo: trailerID})
    } else {
      trailerExist = await Watchlist.find({paidVideo: trailerID})
    }
     console.log(trailerExist)
    if (channelExist[0] != null && trailerExist[0] != null) {
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