import { toast } from "react-toastify";
import likesAPIInstance from "./api";
import { Like } from "./types";
import { getIdWithToken, getToken } from "../auth/service";
import { Tweet } from "../tweets/types";

export async function getLikesInAPI(): Promise<Like[]> {
    return await likesAPIInstance.get('/likes');
}

export async function createLikeInAPI(tweet : Tweet, userId : number): Promise<Like | void> {
    if(tweet.likes.find(t => t.userId===userId)) {
        return
    }
    return await likesAPIInstance.post('/likes', {
        tweetId: tweet.id,
        userId
    });
}

export async function deleteLikeInAPI(likes: Like[]) {
    const userId : number = getIdWithToken(getToken());
    const like = likes.find( (like) => like.userId === userId);
    if(like) {
        await likesAPIInstance.delete(`/likes/${like.id}`)
    };
}

likesAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.response.data);
    throw error;
});

export function getIfTweetIsLiked(likes: Like[], tweetId: number) {
    const userId  = getIdWithToken(getToken());
    const like = likes.find( (like) => like.tweetId === tweetId && like.userId === userId);
    return Boolean(like);
};