import { number, object } from "yup"

const create = object({
    reviewId: number().required()
})

const remove = object({
    reviewId: number().required()
})

const getLike = object({
    reviewId: number().required()
})

const getCount = object({
    reviewId: number().required()
})

const getCountByUser = object({
    userId: number().required()
})

export const schemas = {
    create,
    remove,
    getLike,
    getCount,
    getCountByUser
}