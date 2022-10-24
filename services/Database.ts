import mongoose from 'mongoose'
import { MONGO_URI } from '../config'

export default async() => {
    try {
        mongoose.connect(MONGO_URI).then(result => {
            console.log("Connected to Database")
        }).catch(error => console.log("Error: ", error))
    } catch(error) {
        console.log(error)
    }
}
