import { RequestHandler } from "express"
import services from "./services"

const getByReview: RequestHandler = async (req, res) => {
    const { reviewId, userId } = req.body
    const result = services.getByReview(reviewId, userId)
    res.json(result)
}

const createLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    services.createLike(userId, reviewId)
    res.end()
}

const removeLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    services.removeLike(userId, reviewId)
    res.end()
}

export default {
    createLike,
    removeLike,
    getByReview
}