import prisma from "../services/prisma"

const getAll = async () => {
    return await prisma.user.findMany()
}

const create = async (nick: string) => {
    return await prisma.user.create({
        data: { nick }
    })
}

export default {
    getAll,
    create
}