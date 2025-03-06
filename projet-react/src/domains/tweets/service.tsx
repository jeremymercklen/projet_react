import { toast } from "react-toastify";
import tweetsAPIInstance from "./api";
import { Tweet } from "./types";
import { getIdWithToken } from "../auth/service";

export async function createTweetInAPI(content: string): Promise<Tweet> {
    const tweet = {
        userId: getIdWithToken(localStorage.getItem('accessToken')!),
        content: content,
        creationTime: Date.now()
    };

    return await tweetsAPIInstance.post('/tweets', {
        userId: tweet.userId,
        content: tweet.content,
        creationTime: tweet.creationTime
    });
}

export async function getTweetsOrderByDateInAPI(): Promise<Tweet[]> {
    const response: Tweet[] = await tweetsAPIInstance.get('/tweets', { params: { _sort: "creationTime", _order: 'desc' } });
    console.log('response', response)
    return response;
}

export async function editTweetInAPI(tweetId: number, content: string) {
    const token = localStorage.getItem('accessToken');
    await tweetsAPIInstance.patch(`/600/tweets/${tweetId}`, {
        content: content
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function deleteTweetInAPI(tweetId: number) {
    const token = localStorage.getItem('accessToken');
    await tweetsAPIInstance.delete(`/600/tweets/${tweetId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

tweetsAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.response.data);
    throw error;
});