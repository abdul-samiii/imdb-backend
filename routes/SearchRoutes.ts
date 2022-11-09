import express from 'express'
import { Search } from '../controllers'

import { Authenticate } from '../middleware/Auth'

const router = express.Router()

router.use(Authenticate)
router.get('/', Search)

export { router as SearchRoute }
