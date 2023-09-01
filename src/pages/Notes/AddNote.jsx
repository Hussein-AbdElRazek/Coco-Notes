import React from 'react'
import AddNoteForm from './AddNoteForm'
import useHttp from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { notesActions } from '../../store/notes-slice';
const AddNote = () =>
{
    const dispatch = useDispatch();
    const {
        isLoading: isLoadingAddNote,
        sendRequest: addNote
    } = useHttp();
    const handleAddNote = (values, { resetForm }) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                values.createdAt = new Date();
                dispatch(notesActions.addNote(values))
                resetForm();
                //TODO when zezo handle id remove it
                window.location.reload();
            }
        };
        addNote(
            {
                url: "addNote",
                method: "POST",
                body: values,
            },
            getResponse
        );
    }
    return (
        <AddNoteForm isLoadingAddNote={isLoadingAddNote} addNote={handleAddNote} />
    )
}

export default AddNote