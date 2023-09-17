import prisma from "../services/prisma"

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

const getLikeCount = async (reviewId: number) => {
    const count = await prisma.like.count({
        where: {
            reviewId: reviewId
        }
    })
    return count
}

const getLikeCountByUser = async (userId: number) => {
    console.log(userId)
    return await prisma.like.count({
        where: {
            review: {
                authorId: userId
            }
        }
    })
}

export default {
    createLike,
    removeLike,
    isLikeExists,
    getLikeCount,
    getLikeCountByUser
}