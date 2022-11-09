import { Request, Response, NextFunction } from 'express'

import { Channel, FreeMoviesImage, FreeMoviesTrailer, PaidMoviesImage, PaidMoviesTrailer } from '../models'

// ADD MOVIE Trailer
export const AddTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, videoLink, duration, channel, type } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      if (type === 'free') {
          FreeMoviesTrailer.create({
            title: title,
            link: videoLink,
            duration: duration,
            channel: channel
          })
        } else if (type === 'pro') {
          PaidMoviesTrailer.create({
            title: title,
            link: videoLink,
            duration: duration,
            channel: channel
          })
        }
          return res.status(200).json({"message": "Trailer added Successfully"})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

// GET MOVIE Trailer
export const GetTrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
      // if (type === 'free') {
      //     FreeMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   } else if (type === 'pro') {
      //     PaidMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   }
        const freeMovies = await FreeMoviesTrailer.find().populate({path: 'reviews'}).populate({path: 'channel'})
          return res.status(200).json({"message": "Trailer Fetched", "freeMovies": freeMovies})
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

// GET MOVIE TRAILERS OF 1 CHANNEL
export const GetChannelTrailers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel } = req.params
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      // if (type === 'free') {
      //     FreeMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   } else if (type === 'pro') {
      //     PaidMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   }
        const freeMovies = await FreeMoviesTrailer.find({channel: channel})
          return res.status(200).json({"message": "Trailer Fetched", "freeMovies": freeMovies})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

// ADD MOVIE IMAGES
export const AddMovieImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, imgLink, channel, type } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      if (type === 'free') {
          FreeMoviesImage.create({
            title: title,
            link: imgLink,
            channel: channel
          })
        } else if (type === 'pro') {
          PaidMoviesImage.create({
            title: title,
            link: imgLink,
            channel: channel
          })
        }
          return res.status(200).json({"message": "Movie Images added Successfully"})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}

// GET MOVIE IMAGES
export const GetMovieImages= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channel } = req.body
    const channelExist = await Channel.find({channel})
    if (channelExist[0] != null) {
      // if (type === 'free') {
      //     FreeMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   } else if (type === 'pro') {
      //     PaidMovies.create({
      //       title: title,
      //       link: videoLink,
      //       channel: channel
      //     })
      //   }
        const freeMoviesImage = await FreeMoviesImage.find().populate({path: 'channel'})
          return res.status(200).json({"message": "Movie Images Fetched", "freeMoviesImage": freeMoviesImage})
        } else {
          return res.status(403).json({"message": "Something went wrong"})
        }
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}