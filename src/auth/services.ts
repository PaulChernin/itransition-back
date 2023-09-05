import prisma from "../services/prisma"

const findOrCreateByVkId = async (vkId: number, vkName: string) => {
    const user = await prisma.user.upsert({
        where: {
            vkId: vkId
        },
        create: {
            nick: vkName,
            vkId: vkId
        },
        update: {},
        select: {
            id: true,
            nick: true
        }
    })
    console.log(user)
    return user
}

export default {
    findOrCreateByVkId
}