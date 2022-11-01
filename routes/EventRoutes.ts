import express from 'express'
import { AddEvent, DeleteEvent, GetAllEvents, GetChannelEvents, UpdateEvent } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

// router.use(Authenticate)
router.post('/create', AddEvent)
router.get('/', GetAllEvents)
router.patch('/update', UpdateEvent)
router.delete('/:eid', DeleteEvent)
router.get('/channelevents/:channel', GetChannelEvents)

export { router as EventRoute }
