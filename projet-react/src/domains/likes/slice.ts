import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Like } from "./types";
import { createLikeInAPI, deleteLikeInAPI, getLikesInAPI } from "./service";
import { getIdWithToken } from "../auth/service";

export const createLike = createAsyncThunk('likes/createLike', async (tweetId: number) => {
    return await createLikeInAPI(tweetId, getIdWithToken(localStorage.getItem('accessToken')!));
});

export const deleteLike = createAsyncThunk('likes/deleteLike', async({likes, tweetId}: {likes: Like[], tweetId: number}) => {
    const userId : number = getIdWithToken(localStorage.getItem('accessToken')!);
    const like = likes.find( (like) => like.tweetId === tweetId && like.userId === userId);
    await deleteLikeInAPI(like!.id);
    return like!.id;
});

export const getLikes = createAsyncThunk('likes/getLikes', async() => {
    return await getLikesInAPI();
})

const likesSlice = createSlice({
    name: 'likes',
    initialState : {likes: [] as Like[]},
    reducers : {
        setlikes: (state, action) : void => {
            state.likes = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createLike.fulfilled, (state, action) => {
            const like: Like = action.payload;
            state.likes = [...state.likes, like]
        })
        .addCase(deleteLike.fulfilled, (state, action) => {
            state.likes = state.likes.filter((like) => like.id !== action.payload);
        })
        .addCase(getLikes.fulfilled, (state, action) => {
            state.likes = action.payload;
        })
    }

});

export const { setlikes } = likesSlice.actions;
export default likesSlice.reducer;