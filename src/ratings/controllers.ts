import { RequestHandler } from "express"
import { Request as JwtRequest } from 'express-jwt'
import services from "./services"
import { User } from "../types/User"
import { InferType } from "yup"
import { ratingSchemas } from "./validation"

const createRating: RequestHandler = async (req: JwtRequest<User>, res) => {
    const body: InferType<typeof ratingSchemas.create> = req.body
    const userId = req.auth!.id
    services.createRating(userId, body.productId, body.rating)
    res.end()
}

const getAverageRating: RequestHandler = async (req: JwtRequest<User>, res) => {
    const body: InferType<typeof ratingSchemas.getAverage> = req.body
    const result = await services.getAverageRating(body.productId)
    res.json(result)
}

export default {
    createRating,
    getAverageRating
}