import { number, object, string } from "yup"

const getPopular = object({
    count: number()
})

const getByPrefix = object({
    prefix: string().required()
})

export const tagSchemas = {
    getPopular,
    getByPrefix
}