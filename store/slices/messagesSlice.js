// features/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        updateLastMessage: (state, action) => {
            state.messages[state.messages.length - 1] = action.payload;
        },
    },
});

export const { setMessage, addMessage, updateLastMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
