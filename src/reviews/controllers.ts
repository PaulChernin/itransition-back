import { RequestHandler } from "express"
import services from "./services"
import { ReviewCreateProps, ReviewUpdateProps, UserReviewsGetProps } from "./models"

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
    res.json(await services.getById(id))
}

const getByTag: RequestHandler = async (req, res) => {
    const tag = req.body.tag
    res.json(await services.getByTag(tag))
}

const getByUser: RequestHandler = async (req, res) => {
    const props: UserReviewsGetProps = req.body
    res.json(await services.getByUser(props))
}

const create: RequestHandler = async (req, res) => {
    const review: ReviewCreateProps = req.body
    const id = await services.create(review)
    res.json({ id: id })
}

const update: RequestHandler = async (req, res) => {
    const review: ReviewUpdateProps = req.body
    await services.update(review)
    res.end()
}

const remove: RequestHandler = async (req, res) => {
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