import express from 'express'
import { Login, Registeration } from '../controllers'

const router = express.Router()

router.post('/register', Registeration)
router.post('/login', Login)
export { router as AuthRoute }
