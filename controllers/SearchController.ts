import { Request, Response, NextFunction } from 'express'

import { Celebrity, Event, FreeMoviesImage, FreeMoviesTrailer,  } from '../models'

// SEARCH
export const Search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, searchwords } = req.headers
    console.log(req.headers)
    if (type === 'Movies') {
      const searchResults = await FreeMoviesTrailer.find({title: {"$regex": searchwords, "$options": "i"}}).populate({path: 'reviews'}).populate({path: 'channel'})
      return res.status(200).json({"message": "Trailer Searched & Fetched", "searchResults": searchResults})
    } else if (type === 'Pictures') {
      const searchResults = await FreeMoviesImage.find({title: {"$regex": searchwords, "$options": "i"}})
      return res.status(200).json({"message": "Images Searched & Fetched", "searchResults": searchResults})
    } else if (type === 'Celebrities') {
      const searchResults = await Celebrity.find({name: {"$regex": searchwords, "$options": "i"}})
      return res.status(200).json({"message": "Celebrity Searched & Fetched", "searchResults": searchResults})
    } else if (type === 'Events') {
      const searchResults = await Event.find({title: {"$regex": searchwords, "$options": "i"}})
      return res.status(200).json({"message": "Event Searched & Fetched", "searchResults": searchResults})
    } else {
      return res.status(403).json({"message": "Something went wrong"})
    }
    
  } catch (error) {
    return res.status(403).json({"error": error})
  }
}