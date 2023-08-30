import { RequestHandler } from "express"
import services from "./services"

const getAll: RequestHandler = async (req, res) => {
    res.json(await services.getAll())
}

const create: RequestHandler = async (req, res) => {
    const nick = req.body.nick
    const user = await services.create(nick)
    res.json(user)
}

export default {
    getAll,
    create
}