import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    thread: {
        thread_id:'',
        messages:[]
    },
};

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        setThread: (state, action) => {
            state.thread = action.payload;
        },
        addMessage: (state, action) => {
            state.thread.messages?.push(action.payload);
        },
        updateLastMessage: (state, action) => {
            state.thread.messages[state.thread.messages?.length - 1] = action.payload;
        },
    },
});

export const { setThread, addMessage, updateLastMessage } = threadSlice.actions;
export default threadSlice.reducer;
