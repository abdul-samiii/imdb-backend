import express from 'express'
import { AddEvent, GetAllEvents } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', AddEvent)
router.get('/', GetAllEvents)

export { router as EventRoute }
