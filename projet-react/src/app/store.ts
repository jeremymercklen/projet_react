import { configureStore } from '@reduxjs/toolkit'
import connectionSlice from '../domains/auth/slice'

const store = configureStore({
    reducer: {
        connection: connectionSlice
    }
});

export default store;