import { number, object } from "yup"

const create = object({
    productId: number().required(),
    rating: number().required().min(1).max(5)
})

const getAverage = object({
    productId: number().required()
})

export const ratingSchemas = {
    create,
    getAverage
}