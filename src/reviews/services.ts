import { ReviewCreateProps, ReviewUpdateProps } from "./models"
import prisma from "../services/prisma"

const createProduct = async (name: string) => {
    const product = await prisma.product.create({
        data: {
            name: name
        }
    })
    return product.id
}

// const createTags = async (texts: Array<string>) => {
//     const data = texts.map(text => {
//         return { text: text }
//     })
//     prisma.tag.createMany({
//         data: data
//     })
// }

const create = async (review: ReviewCreateProps) => {
    const productId = await createProduct(review.productName)
    await prisma.review.create({
        data: {
            title: review.title,
            text: review.text,
            authorId: review.authorId,
            categoryId: review.categoryId,
            productId: productId,
            authorsScore: review.authorsScore
        }
    })
}

const update = async (review: ReviewUpdateProps) => {
    await prisma.review.update({
        where: {
            id: review.id
        },
        data: {
            title: review.title,
            text: review.text,
            categoryId: review.categoryId,
            authorsScore: review.authorsScore
        }
    })
}

const getLatest = async (count: number = 20) => {
    return await prisma.review.findMany({
        select: {
            id: true,
            category: true,
            product: true,
            authorsScore: true,
            tags: true
        },
        take: count,
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
}

const getBest = async (count: number = 20) => {
    return await prisma.review.findMany({
        select: {
            id: true,
            category: true,
            product: true,
            authorsScore: true,
            tags: true
        },
        take: count,
        orderBy: [
            {
                likes: {
                    _count: 'desc'
                }
            }
        ]
    })
}

const getById = async (id: number) => {
    return await prisma.review.findUnique({
        where: {
            id: id
        },
        include: {
            author: true,
            category: true,
            product: true,
            tags: true,
            _count: {
                select: {
                    likes: true
                }
            }
        }
    })
}

const getByTag = async (tag: string) => {
    return await prisma.review.findMany({
        where: {
            tags: {
                some: {}
            }
        }
    })
}

export default {
    create,
    update,
    getLatest,
    getBest,
    getById,
    getByTag,
}