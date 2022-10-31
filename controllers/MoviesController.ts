import { Request, Response, NextFunction } from 'express'

import { Channel, FreeMovies, PaidMovies, User } from '../models'

// ADD MOVIE Trailer
export const AddTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, videoLink, duration, channel, type } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      if (type === 'free') {
          FreeMovies.create({
            title: title,
            link: videoLink,
            duration: duration,
            channel: channel
          })
        } else if (type === 'pro') {
          PaidMovies.create({
            title: title,
            link: videoLink,
            duration: duration,
            channel: channel
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

// GET MOVIE Trailer
export const GetTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      // if (type === 'free') {
      //     FreeMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   } else if (type === 'pro') {
      //     PaidMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   }
        const freeMovies = await FreeMovies.find()
          return res.status(200).json({"message": "Trailer Fetched", "freeMovies": freeMovies})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}