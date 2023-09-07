import { RequestHandler } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { ReviewCreateProps, ReviewUpdateProps, UserReviewsGetProps } from "./models"
import { User } from "../types/User"

const getBest: RequestHandler = async (req, res) => {
    const count = req.body.count
    res.json(await services.getBest(count))
}

const getLatest: RequestHandler = async (req, res) => {
    const count = req.body.count
    res.json(await services.getLatest(count))
}

const getById: RequestHandler = async (req, res) => {
    const id = req.body.id
    const review = await services.getById(id)
    if (review) {
        res.json(review)
        return
    }
    res.status(404).end()
}

const getByTag: RequestHandler = async (req, res) => {
    const tag = req.body.tag
    res.json(await services.getByTag(tag))
}

const getByUser: RequestHandler = async (req: JwtRequest<User>, res) => {
    const user = req.auth!
    if (!user.isAdmin && user.id === req.body.id) {
        res.status(403).end()
        return
    }
    const props: UserReviewsGetProps = req.body
    const reviews = await services.getByUser(props)
    res.json(reviews)
}

const create: RequestHandler = async (req: JwtRequest<User>, res) => {
    const user = req.auth!
    if (!user.isAdmin && user.id === req.body.authorId) {
        res.status(403).end()
        return
    }
    const review: ReviewCreateProps = req.body
    const id = await services.create(review)
    res.json({ id: id })
}

const update: RequestHandler = async (req: JwtRequest<User>, res) => {
    // TODO: check that user is author or admin
    const review: ReviewUpdateProps = req.body
    await services.update(review)
    res.end()
}

const remove: RequestHandler = async (req, res) => {
    // TODO: check that user is author or admin
    const id = req.body.id
    await services.remove(id)
    res.end()
}

export default {
    getBest,
    getLatest,
    getById,
    getByTag,
    getByUser,
    create,
    update,
    remove
}