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
        where: {
            reviews: {
                some: {}
            }
        },
        take: count,
        include: {
            _count: {
                select: {
                    reviews: true
                }
            }
        }
    })
    console.log(tags)
    return tags.map(tag => {
        return {
            value: tag.text,
            count: tag._count.reviews
        }
    })
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