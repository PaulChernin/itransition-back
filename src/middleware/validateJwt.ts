import { expressjwt } from "express-jwt"

const key = process.env.JWT_KEY
if (!key) {
    throw new Error('No JWT key provided')
}

const validateJwt = expressjwt({
    secret: key,
    algorithms: ["HS256"]
})

export default validateJwt