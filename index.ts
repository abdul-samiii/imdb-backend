import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import dbConnection from './services/Database'
import { AuthRoute, ChannelRouter, UserRoute } from './routes'

const StartServer = async () => {
  const app = express()
  const port = process.env.PORT || 5500
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use((req, res, next) => { next(); }, cors({maxAge: 84600}))
  
  //ROUTERS
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/channel', ChannelRouter)
  
  //CONNECTION TO DB
  await dbConnection()

  app.listen(port, () => {
    console.clear()
    console.log('App is running at port ',port)
  })
}
StartServer()
