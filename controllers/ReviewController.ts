import { Request, Response, NextFunction } from 'express'

import { Channel, Event, FreeMoviesTrailer, Reviews } from '../models'

// ADD TRAILER REVIEW
export const AddTrailerReview = async (req: Request, res: Response, next: NextFunction) => {
  const { channel, ratings, comment, user, trailer, trailerId } = req.body
  const channelExist = await Channel.find({_id: channel})
  const TrailerExist = await FreeMoviesTrailer.find({_id: trailerId})
  const ReviewExist = await Reviews.find({user, trailerId})

  if (channelExist[0] != null) {
    if (TrailerExist[0] !=null ) {
      if (ReviewExist[0] == null) {
        const review = await Reviews.create({
        ratings: ratings,
        comment: comment,
        user: user,
        trailer: trailer,
        trailerId: trailerId
      })
      await FreeMoviesTrailer.findByIdAndUpdate({_id: trailerId}, {
        $push: {
          reviews: review._id
        }
      })
        return res.status(200).json({"message": "Trailer Reviewed", "review": review})
      } else {
        return res.status(403).json({"message": "Trailer already reviewed"})
      }
      
    } else {
      return res.status(403).json({"message": "Trailer not found"})
    }
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// DELETE TRAILER REVIEW
export const DeleteTrailerReview = async (req: Request, res: Response, next: NextFunction) => {
  const { channel, user, trailerid } = req.headers
  console.log(req.headers)
  const channelExist = await Channel.find({_id: channel})
  const TrailerExist = await FreeMoviesTrailer.find({_id:trailerid})
  const ReviewExist = await Reviews.find({user, trailerid})
  console.log(ReviewExist)
  if (channelExist[0] != null) {
    if (TrailerExist[0] !=null ) {
      if (ReviewExist[0] != null) {
        await Reviews.deleteOne({user, trailerid})
        await FreeMoviesTrailer.findByIdAndUpdate({_id: trailerid}, {
          $pull: {
            reviews: ReviewExist[0]._id
          }
      })
        return res.status(200).json({"message": "Review Deleted"})
      } else {
        return res.status(403).json({"message": "Review already Deleted"})
      }
      
    } else {
      return res.status(403).json({"message": "Trailer not found"})
    }
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// GET TRAILER REVIEWS
export const GetTrailerReview = async (req: Request, res: Response, next: NextFunction) => {
  const { channel, trailerid } = req.headers
  console.log(req.headers)
  const channelExist = await Channel.find({_id: channel})
  const TrailerExist = await FreeMoviesTrailer.find({_id:trailerid})
  const ReviewExist = await Reviews.find({trailerid})
  console.log(ReviewExist)
  if (channelExist[0] != null) {
    if (TrailerExist[0] !=null ) {
      if (ReviewExist[0] != null) {
        const trailerReview = await Reviews.find({trailerid})
        return res.status(200).json({"message": "Review Fetched", "trailerReview": trailerReview})
      } else {
        return res.status(403).json({"message": "Review not found"})
      }
      
    } else {
      return res.status(403).json({"message": "Trailer not found"})
    }
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}

// GET USER'S TRAILER REVIEWS
export const GetUserTrailerReview = async (req: Request, res: Response, next: NextFunction) => {
  const { channel, trailerid } = req.headers
  const { user } = req.params
  console.log(req.headers)
  const channelExist = await Channel.find({_id: channel})
  const TrailerExist = await FreeMoviesTrailer.find({_id:trailerid})
  const ReviewExist = await Reviews.find({user, trailerid})
  console.log(ReviewExist)
  if (channelExist[0] != null) {
    if (TrailerExist[0] !=null ) {
      if (ReviewExist[0] != null) {
        const trailerReview = await Reviews.find({user, trailerid}).populate({path: 'trailerId'})
        return res.status(200).json({"message": "Review Fetched", "trailerReview": trailerReview})
      } else {
        return res.status(403).json({"message": "Review not found"})
      }
      
    } else {
      return res.status(403).json({"message": "Trailer not found"})
    }
      } else {
        return res.status(403).json({"message": "Something went wrong"})
      }
}
