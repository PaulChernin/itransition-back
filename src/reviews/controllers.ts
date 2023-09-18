import { RequestHandler } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { User } from "../types/User"
import { InferType } from "yup"
import { schemas } from "./validation"

const getBest: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getBest> = req.body
    res.json(await services.getBest(body.count))
}

const getLatest: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getLatest> = req.body
    res.json(await services.getLatest(body.count))
}

const getById: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getById> = req.body
    const review = await services.getById(body.id)
    if (review) {
        res.json(review)
        return
    }
    res.status(404).end()
}

const getByTag: RequestHandler = async (req, res) => {
    const body: InferType<typeof schemas.getByTag> = req.body
    res.json(await services.getByTag(body.tag))
}

const getByUser: RequestHandler = async (req: JwtRequest<User>, res) => {
    const user = req.auth!
    const body: InferType<typeof schemas.getByUser> = req.body
    if (!(user.isAdmin || user.id === req.body.userId)) {
        res.status(403).end()
        return
    }
    const reviews = await services.getByUser(body)
    res.json(reviews)
}

const create: RequestHandler = async (req: JwtRequest<User>, res) => {
    const user = req.auth!
    const body: InferType<typeof schemas.create> = req.body
    if (!user.isAdmin && user.id !== body.authorId) {
        res.status(403).end()
        return
    }
    const id = await services.create(body.authorId, body.review)
    res.json({ id: id })
}

const update: RequestHandler = async (req: JwtRequest<User>, res) => {
    // TODO: check that user is author or admin
    const body: InferType<typeof schemas.update> = req.body
    await services.update(body.id, body.review)
    res.end()
}

const remove: RequestHandler = async (req, res) => {
    // TODO: check that user is author or admin
    const body: InferType<typeof schemas.remove> = req.body
    await services.remove(body.id)
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