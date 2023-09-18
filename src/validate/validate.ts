import { RequestHandler } from "express"
import { Schema } from "yup"

export const validate = (schema: Schema) => {
    const handler: RequestHandler = async (req, res, next) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (e) {
            res.status(400).send(e).end()
        }
    }
    return handler
}