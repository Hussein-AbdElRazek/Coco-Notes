import { createSlice } from '@reduxjs/toolkit';
import { mergeToUnique } from '../helpers/mergeToUnique';


const initialNotesState = {
    notes: [],
    isNoteOpened: false
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: initialNotesState,
    reducers: {
        addNote(state, action)
        {
            state.notes.push(action.payload)
        },
        mergeNotes(state, action)
        {
            state.notes = mergeToUnique(state.notes, action.payload);
        },
        removeNote(state, action)
        {
            state.notes = state.notes.filter(ele => ele._id !== action.payload)
        },
        editNote(state, action)
        {
            state.notes = state.notes.map(ele =>
            {
                if (ele._id === action.payload._id)
                {
                    return { ...ele, noteAbstract: action.payload.noteAbstract }
                }
                else return ele;
            })
        },
        openNote(state)
        {
            state.isNoteOpened = true;
        },
        closeNote(state)
        {
            state.isNoteOpened = false;
        },

    }
})


export const notesActions = notesSlice.actions

export default notesSlice;