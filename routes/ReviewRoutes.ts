import express from 'express'
import { } from '../controllers'
import { AddTrailerReview, DeleteTrailerReview, GetTrailerReview, GetUserTrailerReview } from '../controllers/ReviewController'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/trailer', AddTrailerReview)
router.delete('/trailer', DeleteTrailerReview)
router.get('/trailer', GetTrailerReview)
router.get('/trailer/:user', GetUserTrailerReview)

export { router as ReviewRoute }
