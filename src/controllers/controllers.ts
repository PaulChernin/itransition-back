import { RequestHandler } from "express"
import userService from "../services/userService"

const createUser: RequestHandler = async (req, res) => {
    const nick = req.body.nick
    const user = await userService.create(nick)
    res.json(user)
}

export default {
    createUser
}