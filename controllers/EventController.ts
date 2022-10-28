import { Request, Response, NextFunction } from 'express'

import { Channel, Event } from '../models'

// CREATE EVENT
export const AddEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, img, channel } = req.body
  const channelExist = await Channel.find({channel})
  if (channelExist[0] != null) {
        Event.create({
          title: title,
          description: description,
          img: img,
          channel: channel
        })
        return res.status(200).json({"message": "Event added Successfully"})
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}
