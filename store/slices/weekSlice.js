import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    threads: [],
};

const weekSlice = createSlice({
    name: 'week',
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.threads = action.payload;
        },
        addThreads: (state, action) => {
            state.threads.push(action.payload);
        },
        updateLastThreads: (state, action) => {
            state.threads[state.threads.length - 1] = action.payload;
        },
    },
});

export const { setThreads, addThreads, updateLastThreads } = weekSlice.actions;
export default weekSlice.reducer;
