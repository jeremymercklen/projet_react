export type Tweet = {
    userId: number,
    content: string,
    creationTime: number,
    id: number
}

export type Like = {
    userId: number,
    tweetId: number,
    id: number
}