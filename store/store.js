import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice';
import threadReducer from './slices/threadSlice';
import userReducer from "./slices/userSlice";
import todayReducer from "./slices/todaySlice";
import yesterdayReducer from "./slices/yesterdaySlice";
import weekReducer from "./slices/weekSlice";
import monthReduer from "./slices/monthSlice";

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        thread: threadReducer,
        user: userReducer,
        thread: threadReducer,
        today: todayReducer,
        yesterday: yesterdayReducer,
        week: weekReducer,
        month: monthReduer
    },
});

export default store;
