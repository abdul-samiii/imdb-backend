import express from 'express'
import { GetUser, UpdateUser } from '../controllers'
import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.get('/:uid', GetUser)
router.patch('/', UpdateUser)

export { router as UserRoute}
