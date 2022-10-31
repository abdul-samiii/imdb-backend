import express from 'express'
import { AddTrailer, GetTrailer } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/create', AddTrailer)
router.get('/free', GetTrailer)
export { router as MoviesRoute }
