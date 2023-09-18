import { RequestHandler, Response } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { User } from "../types/User"
import { InferType, number, object } from "yup"

const createComment = async (req: JwtRequest<User>, res: Response) => {
    const userId = req.auth!.id
    const { text, reviewId } = req.body
    await services.createComment(userId, text, reviewId)
    res.end()
}

export const getByReviewSchema = object({
    id: number().required()
})

const getByReview: RequestHandler = async (req, res) => {
    const { id }: InferType<typeof getByReviewSchema> = req.body
    const comments = await services.getByReview(id)
    res.json(comments)
}

export default {
    createComment,
    getByReview
}