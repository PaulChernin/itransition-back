import prisma from "../services/prisma"

const createRating = async (userId: number, productId: number, rating: number) => {
    await prisma.rating.upsert({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId
            }
        },
        create: {
            userId: userId,
            productId: productId,
            rating: rating
        },
        update: {
            rating: rating
        }
    })
}

const getAverageRating = async (productId: number) => {
    const result = await prisma.rating.aggregate({
        _avg: {
            rating: true
        },
        where: {
            productId: productId
        }
    })
    return {
        average: result._avg.rating || 0
    }
}

export default {
    createRating,
    getAverageRating
}