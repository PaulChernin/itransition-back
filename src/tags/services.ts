import prisma from "../services/prisma"

const getPopular = async (count: number = 20) => {
    const tags = await prisma.tag.findMany({
        orderBy: [
            {
                reviews: {
                    _count: 'desc'
                }
            }
        ],
        take: count
    })
    return tags.map(tag => tag.text)
}

const getByPrefix = async (prefix: string) => {
    const tags = await prisma.tag.findMany({
        where: {
            text: {
                startsWith: prefix
            }
        }
    })
    return tags.map(tag => tag.text)
}

export default {
    getPopular,
    getByPrefix
}