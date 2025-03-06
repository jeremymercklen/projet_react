import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {isDarkMode: false},
    reducers : {
        changeTheme: (state) : void => {
            state.isDarkMode = !state.isDarkMode;
        },
    }
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;