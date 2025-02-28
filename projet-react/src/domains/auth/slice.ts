import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {isConnected: false},
    reducers : {
        setIsConnected: (state, action) : void => {
            state.isConnected = action.payload;
        },
    }
});

export const { setIsConnected } = connectionSlice.actions;
export default connectionSlice.reducer;