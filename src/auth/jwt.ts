import { User } from "./types/user"
import jwt from 'jsonwebtoken'

const key = process.env.JWT_KEY
if (!key) {
    throw new Error('No JWT key provided')
}

export const makeJwt = (user: User) => {
    return jwt.sign(user, key)
}