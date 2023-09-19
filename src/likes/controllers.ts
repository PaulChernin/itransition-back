import { RequestHandler } from "express"
import { Request as JwtRequest } from 'express-jwt'
import services from "./services"
import { User } from "../types/User"
import { InferType } from "yup"
import { schemas } from "./validation"

const createLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const body: InferType<typeof schemas.create> = req.body
    await services.createLike(userId, body.reviewId)
    res.end()
}

const removeLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const body: InferType<typeof schemas.remove> = req.body
    await services.removeLike(userId, body.reviewId)
    res.end()
}

const getLike: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const body: InferType<typeof schemas.getLike> = req.body
    const userLike = await services.isLikeExists(body.reviewId, userId)
    res.json({ userLike: userLike })
}

const getLikeCount: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getCount> = req.body
    const likeCount = await services.getLikeCount(body.reviewId)
    res.json({ count: likeCount })
}

const getLikeCountByUser: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getCountByUser> = req.body
    const count = await services.getLikeCountByUser(body.userId)
    res.json({ count: count })
}

export default {
    createLike,
    removeLike,
    getLikeCount,
    getLike,
    getLikeCountByUser
}