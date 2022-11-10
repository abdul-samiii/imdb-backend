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

// UPDATE USER
export const UpdateUser = async(req: Request, res: Response, next: NextFunction) => {
  const { uid, name, email, phone, city, dob, cnic} = req.body
  const user = await User.findById(uid).populate({path: 'reviews'})
  if (user) {
    await User.updateOne({
      name: name,
      email: email,
      phone: phone,
      city: city,
      dob: dob,
      cnic: cnic,
    })
    return res.status(200).json({"message": "User Updated"})
  } else {
    return res.status(403).json({"message": "Something went wrong"})
  }
  res.status(200).json(uid)
}