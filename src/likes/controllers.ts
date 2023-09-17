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

const getLikeCount: RequestHandler = async (req, res) => {
    const { reviewId } = req.body
    const likeCount = await services.getLikeCount(reviewId)
    res.json({ count: likeCount })
}

const getLikeCountByUser: RequestHandler = async (req, res) => {
    const { userId } = req.body
    const count = await services.getLikeCountByUser(userId)
    res.json({ count: count })
}

export default {
    createLike,
    removeLike,
    getLikeCount,
    getLike,
    getLikeCountByUser
}