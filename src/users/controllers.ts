import { RequestHandler } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { User } from "../types/User"

const getAll: RequestHandler = async (req: JwtRequest<User>, res) => {
    if (!req.auth!.isAdmin) {
        res.status(403).end()
        return
    }
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