import { RequestHandler } from "express"
import services from "../services/services"
import userService from "../services/userService"

const getTopReviews: RequestHandler = (req, res) => {
    res.json(services.getTopReviews())
}

const createUser: RequestHandler = async (req, res) => {
    const nick = req.body.nick
    const user = await userService.create(nick)
    res.json(user)
}

const createReview: RequestHandler = async (req, res) => {
    console.log(req.body)
}

export default {
    getTopReviews,
    createUser,
    createReview
}