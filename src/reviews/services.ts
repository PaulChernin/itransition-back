import { ReviewCreateProps, ReviewUpdateProps, UserReviewsGetProps } from "./models"
import prisma from "../services/prisma"

const createProduct = async (name: string, category: number) => {
    const product = await prisma.product.create({
        data: {
            name: name,
            categoryId: category
        }
    })
    return product.id
}

const createTags = async (texts: Array<string>) => {
    const data = texts.map(text => {
        return { text: text }
    })
    await prisma.tag.createMany({
        data: data
    })
}

const create = async (review: ReviewCreateProps) => {
    const productId = await createProduct(review.productName, review.categoryId)
    await createTags(review.tags)
    const tagsData = review.tags.map(tag => {
        return {
            tagText: tag
        }
    })
    await prisma.review.create({
        data: {
            title: review.title,
            text: review.text,
            authorId: review.authorId,
            productId: productId,
            authorsScore: review.authorsScore,
            tags: {
                create: tagsData
            }
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
            authorsScore: review.authorsScore
        }
    })
}

const getLatest = async (count: number = 20) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            title: true,
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
    return reviews.map(review => {
        return {
            ...review,
            tags: review.tags.map(tag => tag.tagText)
        }
    })
}

const getBest = async (count: number = 20) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            title: true,
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
    return reviews.map(review => {
        return {
            ...review,
            tags: review.tags.map(tag => tag.tagText)
        }
    })
}

const getById = async (id: number) => {
    const result = await prisma.review.findUnique({
        where: {
            id: id
        },
        include: {
            author: true,
            product: true,
            tags: true,
            _count: {
                select: {
                    likes: true
                }
            }
        }
    })
    return result && {
        ...result,
        likesCount: result._count.likes,
        tags: result.tags.map(tag => tag.tagText)
    }
}

const getByTag = async (tag: string) => {
    const reviews = await prisma.review.findMany({
        where: {
            tags: {
                some: {
                    tagText: tag
                }
            }
        },
        select: {
            id: true,
            title: true,
            product: true,
            authorsScore: true,
            tags: true
        }
    })
    return reviews.map(review => {
        return {
            ...review,
            tags: review.tags.map(tag => tag.tagText)
        }
    })
}

const getByUser = async (props: UserReviewsGetProps) => {
    return await prisma.review.findMany({
        where: {
            authorId: props.userId,
            product: {
                categoryId: props.category
            }
        },
        select: {
            id: true,
            title: true
        },
        orderBy: {
            createdAt: props.sortBy === 'date' ? 'desc' : undefined,
            title: props.sortBy === 'name' ? 'asc' : undefined
        }
    })
}

const remove = async (id: number) => {
    await prisma.review.delete({
        where: {
            id: id
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
    getByUser,
    remove
}