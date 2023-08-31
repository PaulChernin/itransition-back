import { RequestHandler } from "express"
import services from "./services"

const getByReview: RequestHandler = async (req, res) => {
    const { reviewId, userId } = req.body
    const result = await services.getByReview(reviewId, userId)
    res.json(result)
}

const createLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    const count = await services.createLike(userId, reviewId)
    res.json(count)
}

const removeLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    const count = await services.removeLike(userId, reviewId)
    res.json(count)
}

export default {
    createLike,
    removeLike,
    getByReview
}