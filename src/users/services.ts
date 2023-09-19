import prisma from "../services/prisma"

const getAll = async () => {
    return await prisma.user.findMany()
}

export default {
    getAll
}