import { RequestHandler } from "express"
import services from "./services"

const createComment: RequestHandler = async (req, res) => {
    const { userId, text, reviewId } = req.body
    await services.createComment(userId, text, reviewId)
    res.end()
}

const getByReview: RequestHandler = async (req, res) => {
    const { id } = req.body
    const comments = await services.getByReview(id)
    res.json(comments)
}

export default {
    createComment,
    getByReview
}