import { toast } from "react-toastify";
import tweetsAPIInstance from "./api";
import { Filter, Tweet } from "./types";
import { getIdWithToken, getToken } from "../auth/service";

export async function createTweetInAPI(content: string): Promise<Tweet> {
    const tweet = {
        userId: getIdWithToken(getToken()),
        content: content,
        creationTime: Date.now()
    };

    return {
        ...await tweetsAPIInstance.post('/tweets', {
            userId: tweet.userId,
            content: tweet.content,
            creationTime: tweet.creationTime
        }), likes: []
    }

}

export async function getTweetsOrderByDateInAPI(): Promise<Tweet[]> {
    const response: Tweet[] = await tweetsAPIInstance.get('/tweets?_embed=likes', { params: { _sort: "creationTime", _order: 'desc' } });
    return response;
}

export async function editTweetInAPI(tweetId: number, content: string) {
    const token = getToken();
    await tweetsAPIInstance.patch(`/600/tweets/${tweetId}`, {
        content: content
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function deleteTweetInAPI(tweetId: number) {
    const token = getToken();
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

export function isTweetToUser(tweetUserId: number): boolean {
    const userId = getIdWithToken(getToken())
    return userId === tweetUserId;
}

export function handleFilterSelect(filter: Filter, followings: number[], tweets: Tweet[]): Tweet[] {
    if (filter === Filter.recent)
        return tweets;
    else if (filter === Filter.trending) {
        console.log('tweets', tweets);
        console.log('filter', (Date.now() - 259200))

        const threeLastDaysTweets: Tweet[] = tweets.filter((tweet) => tweet.creationTime >= (Date.now() - 259200 * 1000));
        return threeLastDaysTweets.sort((a, b) => b.likes.length - a.likes.length);
    } else
        return tweets.filter((tweet) => followings.indexOf(tweet.userId) !== -1);
}