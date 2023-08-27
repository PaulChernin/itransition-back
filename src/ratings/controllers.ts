import { RequestHandler } from "express"
import services from "./services"

const createRating: RequestHandler = async (req, res) => {
    const { userId, reviewId, rating } = req.body
    services.createRating(userId, reviewId, rating)
    res.end()
}

export default {
    createRating
}