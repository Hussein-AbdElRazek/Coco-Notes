
import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './notes-slice';
import tasksReducer from './tasks-slice';

const store = configureStore({
    reducer: {
        notes: notesReducer.reducer,
        tasks: tasksReducer.reducer,
    }
});

export default store;