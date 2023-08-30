export type ReviewCreateProps = {
    authorId: number,
    categoryId: number,
    productName: string,
    title: string,
    text: string,
    authorsScore: number,
    tags: Array<string>
}

export type ReviewUpdateProps = {
    id: number,
    title: string,
    text: string,
    authorsScore: number,
    tags: Array<string>
}

export type UserReviewsGetProps = {
    userId: number,
    category: number | undefined,
    sortBy: 'date' | 'name'
}