import { RequestHandler } from "express"
import { Request as JwtRequest } from 'express-jwt'
import services from "./services"
import { User } from "../types/User"

const createLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const { reviewId } = req.body
    await services.createLike(userId, reviewId)
    res.end()
}

const removeLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const { reviewId } = req.body
    await services.removeLike(userId, reviewId)
    res.end()
}

const getLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const { reviewId } = req.body
    const userLike = await services.isLikeExists(reviewId, userId)
    res.json({ userLike: userLike })
}

export default {
    createLike,
    removeLike,
    getLike
}