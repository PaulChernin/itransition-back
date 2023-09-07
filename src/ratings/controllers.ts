import { RequestHandler } from "express"
import { Request as JwtRequest } from 'express-jwt'
import services from "./services"
import { User } from "../types/User"

const createRating: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const { reviewId, rating } = req.body
    services.createRating(userId, reviewId, rating)
    res.end()
}

export default {
    createRating
}