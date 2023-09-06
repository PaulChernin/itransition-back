import axios from "axios"
import { RequestHandler } from "express"
import services from "./services"
import { makeJwt } from "./jwt"

const serviceToken = process.env.VK_SERVICE_TOKEN
const version = '5.131'
const tokenExchangeUrl = 'https://api.vk.com/method/auth.exchangeSilentAuthToken'

const getUserVkId = async (silentToken: string, uuid: number): Promise<number | null> => {
    const { data } = await axios.post(tokenExchangeUrl, {
        v: version,
        token: silentToken,
        access_token: serviceToken,
        uuid: uuid
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if (data.response) {
        return data.response.user_id
    }
    return null
}

const vkAuth: RequestHandler = async (req, res) => {
    const silent = JSON.parse(req.body.silentToken)
    const userVkId = await getUserVkId(silent.token, silent.uuid)
    if (!userVkId) {
        res.status(400).end()
        return
    }
    const user = await services.findOrCreateByVkId(userVkId, silent.user.first_name)
    const token = makeJwt(user)
    res.json({ user, token })
}

export default {
    vkAuth
}