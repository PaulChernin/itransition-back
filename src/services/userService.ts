import prisma from "./prisma"

const create = async (nick: string) => {
    const user = await prisma.user.create({
        data: { nick }
    })
    return user
}

export default {
    create
}