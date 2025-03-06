import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tweet } from "./types";
import { deleteTweetInAPI, createTweetInAPI, editTweetInAPI, getTweetsOrderByDateInAPI } from "./service";

export const createTweet = createAsyncThunk('tweets/createTweet', async (content: string) => {
    return await createTweetInAPI(content);
});

export const deleteTweet = createAsyncThunk('tweets/deleteTweet', async(idTweet: number) => {
    await deleteTweetInAPI(idTweet);
    return idTweet;  
});

export const editTweet = createAsyncThunk('tweets/edit', async({tweetId, content}: {tweetId: number, content:string}) => {
    await editTweetInAPI(tweetId, content);
    return {tweetId, content};
});

export const getTweetsOrderByDate = createAsyncThunk('tweets/getOrderByDate', async() => {
    return await getTweetsOrderByDateInAPI();
})

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState : {tweets: [] as Tweet[]},
    reducers : {
        setTweets: (state, action) : void => {
            state.tweets = action.payload
        },
        deleteTweet: (state, action) : void => {
            setTweets(state.tweets.filter((tweet) => tweet.id === action.payload.id));
            deleteTweetInAPI(action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTweet.fulfilled, (state, action) => {
            const tweet: Tweet = action.payload;
            state.tweets = [tweet, ...state.tweets]
        })
        .addCase(deleteTweet.fulfilled, (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet.id !== action.payload);
        })
        .addCase(editTweet.fulfilled, (state, action) => {
            const tweet = state.tweets.find((tweet) => tweet.id === action.payload.tweetId);
            tweet!.content = action.payload.content;
        })
        .addCase(getTweetsOrderByDate.fulfilled, (state, action) => {
            state.tweets = action.payload;
        })
    }

});

export const { setTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;