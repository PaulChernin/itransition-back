import { RequestHandler } from "express"
import services from "./services"

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
    removeLike
}