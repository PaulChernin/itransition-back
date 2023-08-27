import prisma from "../services/prisma"

const createLike = async (userId: number, reviewId: number) => {
    await prisma.like.upsert({
        where: {
            userId_reviewId: {
                userId: userId,
                reviewId: reviewId
            }
        },
        create: {
            userId: userId,
            reviewId: reviewId
        },
        update: {}
    })
}

const removeLike = async (userId: number, reviewId: number) => {
    await prisma.like.delete({
        where: {
            userId_reviewId: {
                userId: userId,
                reviewId: reviewId
            }
        }
    })
}

export default {
    createLike,
    removeLike
}