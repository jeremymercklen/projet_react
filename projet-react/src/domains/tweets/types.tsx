import { Like } from "../likes/types"

export type Tweet = {
    userId: number,
    content: string,
    creationTime: number,
    id: number,
    likes: Like[]
}

export enum Filter {
    recent,
    trending,
    following
};