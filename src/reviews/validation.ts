import { array, number, object, string } from "yup"

const getBest = object({
    count: number().min(1)
})

const getLatest = object({
    count: number().min(1)
})

const getById = object({
    id: number().required()
})

const getByTag = object({
    tag: string().required()
})

const getByUser = object({
    userId: number().required(),
    category: string().required(),
    sortBy: string().required().oneOf(['string', 'date'])
})

const review = object({
    productName: string().required(),
    productCategory: string().required().oneOf(['book', 'game', 'movie']),
    title: string().required(),
    text: string().required(),
    authorScore: number().required().min(1).max(10),
    imageUrl: string().url().nullable().defined(),
    tags: array().of(string().required()).required()
})

const create = object({
    authorId: number().required(),
    review: review
})

const update = object({
    id: number().required(),
    review: review
})

const remove = object({
    id: number().required()
})

export const schemas = {
    getBest,
    getLatest,
    getById,
    getByTag,
    getByUser,
    review,
    create,
    update,
    remove
}