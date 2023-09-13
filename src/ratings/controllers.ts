import { RequestHandler } from "express"
import { Request as JwtRequest } from 'express-jwt'
import services from "./services"
import { User } from "../types/User"

const createRating: RequestHandler = async (req: JwtRequest<User>, res) => {
    const userId = req.auth!.id
    const { productId, rating } = req.body
    services.createRating(userId, productId, rating)
    res.end()
}

const getAverageRating: RequestHandler = async (req: JwtRequest<User>, res) => {
    const { productId } = req.body
    const result = await services.getAverageRating(productId)
    res.json(result)
}

export default {
    createRating,
    getAverageRating
}