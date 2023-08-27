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

export default {
    createRating
}