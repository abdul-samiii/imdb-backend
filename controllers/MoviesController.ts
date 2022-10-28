import { Request, Response, NextFunction } from 'express'

import { Channel, FreeMovies, PaidMovies, User } from '../models'

// ADD MOVIE Trailer
export const AddTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, videoLink, channel, type } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      if (type === 'free') {
          FreeMovies.create({
            title: title,
            link: videoLink,
            channel: channel
          })
        } else if (type === 'pro') {
          PaidMovies.create({
            title: title,
            link: videoLink,
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