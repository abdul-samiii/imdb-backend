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

// GET EVENT
export const GetAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, img, channel } = req.body
  const channelExist = await Channel.find({channel})
  if (channelExist[0] != null) {
        const events = await Event.find().populate({path: 'channel'})
        return res.status(200).json({"message": "Events Fetched", "events": events})
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// UPDATE EVENT
export const UpdateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, img, channel, eid } = req.body
  const channelExist = await Channel.find({channel})
  const eventExist = await Event.find({channel})
  if (channelExist[0] != null) {
    if (eventExist[0] !=null ) {
      const events = await Event.findByIdAndUpdate({_id: eid}, {
        $set: {
          title: title,
          description: description,
          img: img,
          channel: channel
        }
      })
      return res.status(200).json({"message": "Event Updated", "events": events})
    } else {
      return res.status(403).json({"message": "Event not found"})
    }
        
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// DELETE EVENT
export const DeleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { eid } = req.params
  const { channel } = req.headers
  console.log(eid, channel)
  const channelExist = await Channel.find({_id: channel})
  const eventExist = await Event.find({_id: eid})
  if (channelExist[0] != null) {
    if (eventExist[0] !=null ) {
      const events = await Event.findByIdAndDelete({_id: eid})
      return res.status(200).json({"message": "Event Deleted"})
    } else {
      return res.status(403).json({"message": "Event not found"})
    }
        
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// GET EVENTS OF 1 CHANNEL
export const GetChannelEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel } = req.params
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
        const channelEvents = await Event.find({channel: channel})
          return res.status(200).json({"message": "Events Fetched", "channelEvents": channelEvents})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}