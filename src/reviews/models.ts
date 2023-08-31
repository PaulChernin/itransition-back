export type ReviewCreateProps = {
    authorId: number,
    categoryName: string,
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
    category: string,
    sortBy: 'date' | 'name'
}