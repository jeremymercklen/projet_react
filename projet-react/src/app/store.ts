import { configureStore } from '@reduxjs/toolkit'
import connectionSlice from '../domains/auth/slice'
import themeSlice from '../ui/slice'
import tweetsSlice from '../domains/tweets/slice'
import likesSlice from '../domains/likes/slice'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'

const store = configureStore({
    reducer: {
        connection: connectionSlice,
        theme: themeSlice,
        tweets: tweetsSlice,
        likes: likesSlice
    }
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

export default store;