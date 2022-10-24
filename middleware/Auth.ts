import { Request, Response, NextFunction } from 'express'
import { AuthPayload } from '../dto'
import { ValidatePassword, ValidatesSignature } from '../utility/PasswordUtility'

declare global {
    namespace Express {
        interface Request{
            user?: AuthPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidatesSignature(req)
    if (validate) {
        next()
    } else {
        return res.status(403).json({"message":"User is not Authorized"})
    }
}