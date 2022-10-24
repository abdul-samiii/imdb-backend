import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utility/PasswordUtility'

//USER REGISTERATION
export const Registeration = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, phone, content_creator, pro, reviews} = req.body
  const alreadyRegister = await User.find({ email: email})
  console.log(alreadyRegister)
  if ( alreadyRegister[0] != null) {
    return res.status(403).json({"message":"User with this email is already registered"})
  }
  const salt = await GenerateSalt();
  var hashPassword;
  hashPassword = await GeneratePassword(password, salt)
  const createUser = await User.create({
    name: name,
    email: email,
    password: hashPassword,
    salt: salt,
    phone: phone,
    content_creator: content_creator,
    pro: pro,
    reviews: reviews
  })
  return res.status(200).json({"message":"Registered Successfully"})
}

//USER LOGIN
export const Login =async (req: Request, res: Response, next: NextFunction ) => {
  const { email, password} = req.body
  var existingUser = await User.find({email:email})
  console.log(existingUser)
  if (existingUser[0] != null) {
    const validation = await ValidatePassword(password, existingUser[0].password, existingUser[0].salt)
    if (validation) {
      const token = GenerateSignature({
        _id: existingUser[0]._id,
        email: existingUser[0].email,
        name: existingUser[0].name
      })
      return res.status(200).json({"message":"You are Logged in ", token: token})
    } else {
      return res.status(403).json({"message":"Invalid Password"})
    }
  } else {
    return res.status(400).json({"message":"User not found"})
  }
}