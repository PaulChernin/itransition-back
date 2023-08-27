export type ReviewCreateProps = {
    title: string,
    text: string,
    authorId: number,
    categoryId: number,
    productName: string,
    authorsScore: number,
    tags: Array<string>
}

export type ReviewUpdateProps = {
    id: number,
    title: string,
    text: string,
    categoryId: number,
    authorsScore: number,
    tags: Array<string>
}