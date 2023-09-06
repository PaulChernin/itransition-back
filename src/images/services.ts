import cloudinary from "../config/cloud"

const create = async (tempPath: string) => {
    const result = await cloudinary.uploader.upload(tempPath)
    return {
        url: result.url
    }
}

export default {
    create
}