import { expressjwt } from "express-jwt"

const key = process.env.JWT_KEY
if (!key) {
    throw new Error('No JWT key provided')
}

const requireAuth = expressjwt({
    secret: key,
    algorithms: ["HS256"]
})

export default requireAuth