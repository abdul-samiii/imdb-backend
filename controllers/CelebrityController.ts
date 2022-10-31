import { Request, Response, NextFunction } from 'express'

import { Celebrity, Channel } from '../models'

// CREATE CELEBRITY
export const AddCelebrity = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, img, channel } = req.body
  const channelExist = await Channel.find({channel})
  if (channelExist[0] != null) {
        Celebrity.create({
          name: name,
          description: description,
          img: img,
          channel: channel
        })
        return res.status(200).json({"message": "Celebrity added Successfully"})
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// GET CELEBRITY
export const GetAllCelebrity = async (req: Request, res: Response, next: NextFunction) => {
  const { channel } = req.body
  const channelExist = await Channel.find({channel})
  if (channelExist[0] != null) {
        const Celebrities = await Celebrity.find().populate({path: 'channel'})
        return res.status(200).json({"message": "Celebrities Fetched", "celebrities": Celebrities})
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}
