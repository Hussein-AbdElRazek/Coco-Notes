
import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './notes-slice';

const store = configureStore({
    reducer: {
        notes: notesReducer.reducer,
    }
});

export default store;