import express from 'express'
import { AddTrailer } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', AddTrailer)

export { router as MoviesRoute }
