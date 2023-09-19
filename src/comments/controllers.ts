import { RequestHandler, Response } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { User } from "../types/User"
import { InferType } from "yup"
import { commentSchemas } from "./validation"

const createComment = async (req: JwtRequest<User>, res: Response) => {
    const userId = req.auth!.id
    const body: InferType<typeof commentSchemas.create> = req.body
    await services.createComment(userId, body.text, body.reviewId)
    res.end()
}

const getByReview: RequestHandler = async (req, res) => {
    const body: InferType<typeof commentSchemas.getByReview> = req.body
    const comments = await services.getByReview(body.id)
    res.json(comments)
}

export default {
    createComment,
    getByReview
}