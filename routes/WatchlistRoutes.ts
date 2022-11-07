import express from 'express'
import { AddWatchlistTrailer, DeleteWatchlistTrailer, GetWatchlistTrailer } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.post('/', AddWatchlistTrailer)
router.get('/', GetWatchlistTrailer)
router.delete('/:trailerID', DeleteWatchlistTrailer)

export { router as WatchlistRoute }
