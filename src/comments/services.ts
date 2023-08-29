import prisma from "../services/prisma"

const createComment = async (userId: number, text: string, reviewId: number) => {
    await prisma.comment.create({
        data: {
            userId: userId,
            text: text,
            reviewId: reviewId
        }
    })
}

const getByReview = async (id: number) => {
    return await prisma.comment.findMany({
        where: {
            reviewId: id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
}

export default {
    createComment,
    getByReview
}