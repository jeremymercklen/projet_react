import { toast } from "react-toastify";
import likesAPIInstance from "./api";
import { Like } from "./types";
import { getIdWithToken } from "../auth/service";

export async function getLikesInAPI(): Promise<Like[]> {
    return await likesAPIInstance.get('/likes');
}

export async function createLikeInAPI(tweetId : number, userId : number): Promise<Like> {
    return await likesAPIInstance.post('/likes', {
        tweetId,
        userId
    });
}

export async function deleteLikeInAPI(likeId: number) {
    await likesAPIInstance.delete(`/likes/${likeId}`);
}

likesAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.response.data);
    throw error;
});

export function getIfTweetIsLiked(likes: Like[], tweetId: number) {
    const userId  = getIdWithToken(localStorage.getItem('accessToken')!);
    const like = likes.find( (like) => like.tweetId === tweetId && like.userId === userId);
    return Boolean(like);
};