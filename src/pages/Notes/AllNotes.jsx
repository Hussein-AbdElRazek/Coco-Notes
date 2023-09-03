import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, } from 'react-redux';

import NotesUi from './NotesUi'
import useHttp from '../../hooks/use-http'
import { notesActions } from '../../store/notes-slice';
//TODO add img
const AllNotes = () =>
{
    const dispatch = useDispatch();
    const {
        isLoading: isLoadingGetAllNotes,
        sendRequest: getAllNotes
    } = useHttp();
    const {
        isLoading: isLoadingMoveNoteToTrash,
        sendRequest: moveNoteToTrash,
    } = useHttp();
    const {
        isLoading: isLoadingEditNote,
        sendRequest: editNote,
    } = useHttp();
    const [pagesSize, setPagesSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [moveNoteToTrashMessage, setMoveNoteToTrashMessage] = useState(null);
    const [isLoadingMoveNoteToTrashId, setIsLoadingMoveNoteToTrashId] = useState(null);
    const [editNoteMessage, setEditNoteMessage] = useState(null);
    const handleMoveNoteToTrash = (values) =>
    {
        setIsLoadingMoveNoteToTrashId(values.noteId)
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(notesActions.removeNote(values.noteId))
                setMoveNoteToTrashMessage(message)
            }
        }
        moveNoteToTrash(
            {
                url: `moveNoteToTrash`,
                method: "POST",
                body: values
            },
            getResponse
        );

    }
    useEffect(()=>{
        if (!isLoadingMoveNoteToTrash) setIsLoadingMoveNoteToTrashId(null)
    },[isLoadingMoveNoteToTrash])
    const handleEditNote = (values) =>
    {
        const submitData={
            noteAbstract:values.noteAbstract,
            noteId: values.noteId,
        }
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                values._id = values.noteId;
                delete values.noteId;
                values.isLoading=false;
                dispatch(notesActions.editNote(values))
                setEditNoteMessage(message)
            }
        }
        editNote(
            {
                url: `editNote`,
                method: "PUT",
                body: submitData
            },
            getResponse
        );
    }
    
    useEffect(() =>
    {
        const getResponse = ({ message, data, totalPages }) =>
        {
            if (message === "success")
            {
                dispatch(notesActions.mergeNotes(data))
                if (totalPages !== pagesSize) setPagesSize(totalPages)
            }
        };
        if (currentPage <= pagesSize)
        {
            getAllNotes(
                {
                    url: `getAllNotes?page=${currentPage}&size=12`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])
    const notes = useSelector((state) => state.notes.notes)
    return (
        <NotesUi
            notes={notes}
            moveNoteToTrash={handleMoveNoteToTrash}
            isLoadingGetAllNotes={isLoadingGetAllNotes}
            isLoadingMoveNoteToTrashId={isLoadingMoveNoteToTrashId}
            isLoadingMoveNoteToTrash={isLoadingMoveNoteToTrash}
            currentPage={currentPage}
            pagesSize={pagesSize}
            setCurrentPage={setCurrentPage}
            editNote={handleEditNote}
            isLoadingEditNote={isLoadingEditNote}
            moveNoteToTrashMessage={moveNoteToTrashMessage}
            editNoteMessage={editNoteMessage}
        />
    )
}

export default AllNotes