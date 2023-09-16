import { ReviewFormData, UserReviewsGetProps } from "./models"
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

const create = async (authorId: number, review: ReviewFormData) => {
    const productId = await createProduct(review.productName, review.productCategory)
    await createTags(review.tags)
    const tagsData = review.tags.map(tag => {
        return {
            tagText: tag
        }
    })
    const { id } = await prisma.review.create({
        data: {
            title: review.title,
            text: review.text,
            authorId: authorId,
            productId: productId,
            authorsScore: review.authorScore,
            imageUrl: review.imageUrl,
            tags: {
                create: tagsData
            }
        }
    })
    return id
}

const removeTags = async (reviewId: number) => {
    await prisma.reviewTag.deleteMany({
        where: {
            reviewId: reviewId
        }
    })
}

const update = async (id: number, review: ReviewFormData) => {
    await removeTags(id)
    await createTags(review.tags)
    const tagsData = review.tags.map(tag => {
        return {
            tagText: tag
        }
    })
    await prisma.review.update({
        where: {
            id: id
        },
        data: {
            title: review.title,
            text: review.text,
            authorsScore: review.authorScore,
            tags: {
                create: tagsData
            }
        }
    })
}

const reviewQueryInclude = {
    author: true,
    product: true,
    tags: true,
    _count: {
        select: {
            likes: true,
            comments: true
        }
    }
}

const reviewQuery = async () => {
    return await prisma.review.findFirst({
        include: reviewQueryInclude
    })
}

type reviewQueryResponse = Awaited<ReturnType<typeof reviewQuery>>

const mapReviewResponse = (result: reviewQueryResponse) => {
    return result && {
        ...result,
        tags: result.tags.map(tag => tag.tagText),
        likesCount: result._count.likes,
        commentsCount: result._count.comments
    }
}

const getLatest = async (count: number = 20) => {
    const reviews = await prisma.review.findMany({
        include: reviewQueryInclude,
        take: count,
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
    return reviews.map(review => mapReviewResponse(review))
}

const getBest = async (count: number = 20) => {
    const reviews = await prisma.review.findMany({
        include: reviewQueryInclude,
        take: count,
        orderBy: [
            {
                likes: {
                    _count: 'desc'
                }
            }
        ]
    })
    return reviews.map(review => mapReviewResponse(review))
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
                    likes: true,
                    comments: true
                }
            }
        }
    })
    return mapReviewResponse(result)
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
        include: reviewQueryInclude
    })
    return reviews.map(review => mapReviewResponse(review))
}

const getByUser = async (props: UserReviewsGetProps) => {
    const reviews = await prisma.review.findMany({
        where: {
            authorId: props.userId,
            product: {
                categoryName: props.category
            }
        },
        include: reviewQueryInclude,
        orderBy: {
            createdAt: props.sortBy === 'date' ? 'desc' : undefined,
            title: props.sortBy === 'name' ? 'asc' : undefined
        }
    })
    return reviews.map(review => mapReviewResponse(review))
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