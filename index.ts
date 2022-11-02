import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import dbConnection from './services/Database'
import { AuthRoute, CelebrityRoute, ChannelRoute, EventRoute, MoviesRoute, ReviewRoute, UserRoute } from './routes'
import { UploadRoutes } from './routes/UploadRoutes'

const StartServer = async () => {
  const app = express()
  const port = process.env.PORT || 5500
  

  app.use(express.static(__dirname + '/public'));
  app.use('/uploads', express.static('uploads'));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use((req, res, next) => { next(); }, cors({maxAge: 84600}))
  
  //ROUTERS
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/channel', ChannelRoute)
  app.use('/upload', UploadRoutes)
  app.use('/event', EventRoute)
  app.use('/movies', MoviesRoute)
  app.use('/celebrity', CelebrityRoute)
  app.use('/review', ReviewRoute)

  //CONNECTION TO DB
  await dbConnection()

  app.listen(port, () => {
    console.clear()
    console.log('App is running at port ',port)
  })
}
StartServer()
