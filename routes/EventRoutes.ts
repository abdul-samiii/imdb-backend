import express from 'express'
import { AddEvent } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', AddEvent)

export { router as EventRoute }
