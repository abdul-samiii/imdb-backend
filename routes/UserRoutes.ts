import express from 'express'
import { GetUser } from '../controllers'
import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.get('/:uid', GetUser)

export { router as UserRoute}
