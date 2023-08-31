import { RequestHandler } from "express"
import services from "./services"

const getPopular: RequestHandler = async (req, res) => {
    const { count } = req.body
    const tags = await services.getPopular(count)
    res.json(tags)
}

const getByPrefix: RequestHandler = async (req, res) => {
    const { prefix } = req.body
    const tags = await services.getByPrefix(prefix)
    res.json(tags)
}

export default {
    getPopular,
    getByPrefix
}