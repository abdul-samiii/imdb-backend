import express from 'express'
import { ChangePassword, Login, Registeration } from '../controllers'

const router = express.Router()

router.post('/register', Registeration)
router.post('/login', Login)
router.patch('/changepassword', ChangePassword)

export { router as AuthRoute }
