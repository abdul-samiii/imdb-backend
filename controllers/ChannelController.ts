import { Request, Response, NextFunction } from 'express'

import { Channel, User } from '../models'

// CREATE CHANNEL
export const CreateChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { uid, channelName, description } = req.body
  const user = await User.find({_id: uid})
  const channelExist = await Channel.find({channelName})
  if (user[0] != null) {
    if (!user[0].content_creator) {
      if (channelExist[0] == null) {
        let channelNew: any
        await User.findOneAndUpdate({_id: uid}, {
          $set:{
            content_creator: true
          }
        }).then( async() => {
          channelNew = await Channel.create({
            channelName,
            description,
            owner: uid
          }).then( async() => {
            await User.findOneAndUpdate({_id: uid}, {
              $set:{
                channel: channelNew._id
              }
            })
          })
        })
        return res.status(200).json({"message": "Channel Created Successfully"})
      } else {
        return res.status(403).json({"message": "Channel with this name already exist"})
      }
    } else {
      return res.status(403).json({"message": "You can't create more then 1 channel"})
    }
  } else {
    return res.status(403).json({"message": "Something went wrong!"})
  }
}

// DELETE CHANNEL
export const DeleteChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const user = await User.find({_id: uid})
  const channelExist = await Channel.find({owner: uid})
  if (user[0] != null) {
    if (user[0].content_creator) {
      if (channelExist[0] != null) {
        await User.findOneAndUpdate({_id: uid}, {
          $set:{
            content_creator: false
          }
        }).then( async() => {
          await Channel.deleteOne({owner: uid})
        })
        return res.status(200).json({"message": "Channel Deleted Successfully"})
      } else {
        return res.status(403).json({"message": "Channel not found"})
      }
    } else {
      return res.status(403).json({"message": "You do not have any Channel"})
    }
  } else {
    return res.status(403).json({"message": "Something went wrong!"})
  }
}

// GET CHANNEL
export const GetChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const user = await User.find({_id: uid})
  const channelExist = await Channel.find({owner: uid})
  if (user[0] != null) {
    if (user[0].content_creator) {
      if (channelExist[0] != null) {
        return res.status(200).json({"message": "Channel Fetched", channel: channelExist[0]})
      } else {
        return res.status(403).json({"message": "Channel not found"})
      }
    } else {
      return res.status(403).json({"message": "You do not have any Channel"})
    }
  } else {
    return res.status(403).json({"message": "Something went wrong!"})
  }
}

// EDIT CHANNEL
export const EditChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { uid, channelName, description } = req.body
  const user = await User.find({_id: uid})
  const channelExist = await Channel.find({channelName})
  if (user[0] != null) {
    if (user[0].content_creator) {
      await Channel.updateOne({owner: uid},{
        $set:{
        channelName,
        description,
    }})
        return res.status(200).json({"message": "Channel Updated Successfully"})
    } else {
      return res.status(403).json({"message": "You donot have any channel"})
    }
  } else {
    return res.status(403).json({"message": "Something went wrong!"})
  }
}