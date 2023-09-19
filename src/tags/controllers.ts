import { RequestHandler } from "express"
import services from "./services"
import { InferType } from "yup"
import { tagSchemas } from "./validation"

const getPopular: RequestHandler = async (req, res) => {
    const body: InferType<typeof tagSchemas.getPopular> = req.body
    const tags = await services.getPopular(body.count)
    res.json(tags)
}

const getByPrefix: RequestHandler = async (req, res) => {
    const body: InferType<typeof tagSchemas.getByPrefix> = req.body
    const tags = await services.getByPrefix(body.prefix)
    res.json(tags)
}

export default {
    getPopular,
    getByPrefix
}