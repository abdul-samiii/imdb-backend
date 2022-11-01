import express from 'express'
import { AddMovieImages, AddTrailer, GetChannelTrailers, GetMovieImages, GetTrailer } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/addtrailer', AddTrailer)
router.get('/freetrailer', GetTrailer)
router.get('/channeltrailers/:channel', GetChannelTrailers)
router.post('/addmovieimage', AddMovieImages)
router.get('/freeimages', GetMovieImages)
export { router as MoviesRoute }
