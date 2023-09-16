export type ReviewFormData = {
    productName: string,
    productCategory: string,
    title: string,
    text: string,
    authorScore: number,
    imageUrl: string | null,
    tags: Array<string>
}

export type UserReviewsGetProps = {
    userId: number,
    category: string,
    sortBy: 'date' | 'name'
}