import { RequestHandler } from "express"
import services from "./services"

const createLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    await services.createLike(userId, reviewId)
    res.end()
}

const removeLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    await services.removeLike(userId, reviewId)
    res.end()
}

const getLike: RequestHandler = async (req, res) => {
    const { userId, reviewId } = req.body
    const userLike = await services.isLikeExists(reviewId, userId)
    res.json({ userLike: userLike })
}

export default {
    createLike,
    removeLike,
}