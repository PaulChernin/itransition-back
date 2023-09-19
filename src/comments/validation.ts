import { number, object, string } from "yup"

const create = object({
    text: string().required(),
    reviewId: number().required()
})

const getByReview = object({
    id: number().required()
})

export const commentSchemas = {
    create,
    getByReview
}