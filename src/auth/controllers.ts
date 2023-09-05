import axios from "axios"
import { RequestHandler } from "express"

const serviceToken = process.env.VK_SERVICE_TOKEN
const version = '5.131'
const tokenExchangeUrl = 'https://api.vk.com/method/auth.exchangeSilentAuthToken'

const getUser = async (silentToken: string, uuid: number) => {
    const response = await axios.post(tokenExchangeUrl, {
        v: version,
        token: silentToken,
        access_token: serviceToken,
        uuid: uuid
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if (response.data.response) {
        return response.data.response.user_id
    }
    return null
}

const vkAuth: RequestHandler = async (req, res) => {
    const silent = JSON.parse(req.body.silentToken)
    const userVkId = await getUser(silent.token, silent.uuid)
    if (!userVkId) {
        res.status(400).end()
    }
    console.log(userVkId)

    res.status(200).end()
}

export default {
    vkAuth
}