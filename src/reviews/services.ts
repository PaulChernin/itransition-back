import { ReviewCreateProps, ReviewUpdateProps, UserReviewsGetProps } from "./models"
import prisma from "../services/prisma"

const createProduct = async (name: string, category: string) => {
    const product = await prisma.product.create({
        data: {
            name: name,
            categoryName: category
        }
    })
    return product.id
}

const createTags = async (texts: Array<string>) => {
    const data = texts.map(text => {
        return { text: text }
    })
    await prisma.tag.createMany({
        data: data,
        skipDuplicates: true
    })
}

const create = async (review: ReviewCreateProps) => {
    const productId = await createProduct(review.productName, review.categoryName)
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
            imageUrl: review.imageUrl,
            tags: {
                create: tagsData
            }
        }
    })
}

const removeTags = async (reviewId: number) => {
    await prisma.reviewTag.deleteMany({
        where: {
            reviewId: reviewId
        }
    })
}

const update = async (review: ReviewUpdateProps) => {
    await removeTags(review.id)
    await createTags(review.tags)
    const tagsData = review.tags.map(tag => {
        return {
            tagText: tag
        }
    })
    await prisma.review.update({
        where: {
            id: review.id
        },
        data: {
            title: review.title,
            text: review.text,
            authorsScore: review.authorsScore,
            tags: {
                create: tagsData
            }
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
            tags: true
        }
    })
    return result && {
        ...result,
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
                categoryName: props.category
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