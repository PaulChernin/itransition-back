import cloudinary from "../config/cloud"

const create = async (tempPath: string) => {
    const result = await cloudinary.uploader.upload(tempPath)
    console.log(result)
    return {
        url: result.url
    }
}

export default {
    create
}