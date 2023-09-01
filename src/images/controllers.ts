import { RequestHandler } from "express"
import services from "./services"

const create: RequestHandler = async (req, res) => {
    const image = req.body.image
    const url = await services.create(image.path)
    res.json(url)
}

export default {
    create
}