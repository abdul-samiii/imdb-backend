import express from 'express'
import { Login, Registeration } from '../controllers'
import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.post('/register', Registeration)
router.post('/login', Login)
router.use(Authenticate)
export { router as AuthRoute }
