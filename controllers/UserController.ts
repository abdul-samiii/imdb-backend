import { Request, Response, NextFunction } from 'express'
import { User } from '../models'

// GET USER
export const GetUser = async(req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const user = await User.findById(uid).populate({path: 'reviews'})
  if (user) {
    return res.status(200).json({"user": user})
  } else {
    return res.status(403).json({"message": "Something went wrong"})
  }
  res.status(200).json(uid)
}
