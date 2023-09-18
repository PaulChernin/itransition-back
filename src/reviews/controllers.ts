import { RequestHandler } from "express"
import { Request as JwtRequest } from "express-jwt"
import services from "./services"
import { User } from "../types/User"
import { ReviewFormData, UserReviewsGetProps } from "./models"
import { InferType, number, object } from "yup"

const getBestSchema = object({
    count: number().min(1)
})

const getBest: RequestHandler = async (req, res) => {
    const body: InferType<typeof getBestSchema> = req.body
    res.json(await services.getBest(body.count))
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

type CreateRequestBody = {
    authorId: number,
    review: ReviewFormData
}

const create: RequestHandler = async (req: JwtRequest<User>, res) => {
    const user = req.auth!
    const { authorId, review }: CreateRequestBody = req.body
    if (!user.isAdmin && user.id !== authorId) {
        res.status(403).end()
        return
    }
    const id = await services.create(authorId, review)
    res.json({ id: id })
}

type UpdateRequestBody = {
    id: number,
    review: ReviewFormData
}

const update: RequestHandler = async (req: JwtRequest<User>, res) => {
    // TODO: check that user is author or admin
    const { id, review }: UpdateRequestBody = req.body
    await services.update(id, review)
    res.end()
}

const remove: RequestHandler = async (req, res) => {
    // TODO: check that user is author or admin
    const id: number = req.body.id
    await services.remove(id)
    res.end()
}

export default {
    getBest,
    getBestSchema,
    getLatest,
    getById,
    getByTag,
    getByUser,
    create,
    update,
    remove
}