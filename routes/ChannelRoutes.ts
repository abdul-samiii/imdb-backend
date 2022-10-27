import express from 'express'

import { CreateChannel, DeleteChannel, EditChannel, GetChannel } from '../controllers'
import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', CreateChannel)
router.delete('/delete/:uid', DeleteChannel)
router.get('/:uid', GetChannel)
router.patch('/update', EditChannel)
export { router as ChannelRoute }
