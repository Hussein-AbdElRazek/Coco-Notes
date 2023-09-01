import React, { useEffect, useState } from 'react'
import NotesUi from './NotesUi'
import useHttp from '../../hooks/use-http'
import { mergeToUnique } from '../../helpers/mergeToUnique'
import { LoadingButton } from '@mui/lab'

const Trash = () =>
{
    const {
        isLoading: isLoadingGetAllTrashNotes,
        sendRequest: getAllTrashNotes
    } = useHttp();
    const {
        isLoading: isLoadingRemoveAllTrash,
        sendRequest: removeAllTrash
    } = useHttp();

    const [pagesSize, setPagesSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [notes, setNotes] = useState([]);

    const handleRemoveAllTrash = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                setNotes([])
            }
        };

        removeAllTrash(
            {
                url: "removeAllTrash",
                method: "DELETE",
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
                if (data !=="no data to be displayed" && data.length)
                {
                    const uniqueAllNotes = mergeToUnique(notes, data)
                    setNotes(uniqueAllNotes)
                }
                if (pagesSize !== totalPages) setPagesSize(totalPages)
            }
        };
        if (currentPage <= pagesSize)
        {
            getAllTrashNotes(
                {
                    url: `getAllNotesInTrash?page=${currentPage}&size=20`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])

    return (
        <>
            {notes.length
                ?
                (<LoadingButton
                    color="error"
                    loading={isLoadingRemoveAllTrash}
                    onClick={handleRemoveAllTrash}>
                    Empty Trash
                </LoadingButton>) : null
            }
            <NotesUi
                notes={notes}
                isLoadingGetAllNotes={isLoadingGetAllTrashNotes}
                trash={true}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesSize={pagesSize}
            />
        </>

    )
}

export default Trash