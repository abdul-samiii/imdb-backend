import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt, {sign} from 'jsonwebtoken'
import { APP_SIGN } from '../config'
import { AuthPayload } from '../dto'

export const GenerateSalt =async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword =async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword: string, savePassword: string, salt: string) => {
  return await GeneratePassword(enteredPassword, salt) === savePassword
}

export const GenerateSignature = (payload: AuthPayload) => {
  return jwt.sign(payload, APP_SIGN, {expiresIn:'1d'})
}

export const ValidatesSignature =async (req:Request) => {
    const signature = req.get('Authorization')
    if (signature) {
        try {
            const payload = await jwt.verify(signature.split(' ')[1],APP_SIGN) as AuthPayload;
            req.user = payload
            return true
        } catch(error) {
            console.log("Invalid Token")
            return false
        }
    }
    return false;
}