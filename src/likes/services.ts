import prisma from "../services/prisma"

const count = async (reviewId: number) => {
    return await prisma.like.count({
        where: {
            reviewId: reviewId
        }
    })
}

const isLikeExists = async (reviewId: number, userId: number) => {
    const userLike = await prisma.like.findUnique({
        where: {
            userId_reviewId: {
                userId: userId,
                reviewId: reviewId
            }
        }
    })
    return !!userLike
}

const getByReview = async (reviewId: number, userId: number) => {
    return {
        count: await count(reviewId),
        userLike: await isLikeExists(reviewId, userId)
    }
}

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
    return await count(reviewId)
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
    return await count(reviewId)
}

export default {
    createLike,
    removeLike,
    getByReview
}