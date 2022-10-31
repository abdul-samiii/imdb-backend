import express from 'express'
import { AddCelebrity, GetAllCelebrity } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', AddCelebrity)
router.get('/', GetAllCelebrity)

export { router as CelebrityRoute }
