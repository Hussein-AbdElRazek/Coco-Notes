import { useEffect, useState } from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const NoteActions = (props) =>
{
    const {
        trash,
        isLoadingMoveNoteToTrashId,
        moveNoteToTrash,
        isLoadingMoveNoteToTrash,
        handleClickEdit,
        noteId,
        noteAbstract,
        disabledEditBtn } = props;
    const [isLoadingMoveToTrash, setIsLoadingNoteToTrash] = useState(false);
    const handleMoveNoteToTrash = () =>
    {
        moveNoteToTrash({ noteId: noteId });
        setIsLoadingNoteToTrash(true)
    }
    const handleEditNote = () =>
    {
        handleClickEdit({ noteAbstract: noteAbstract, noteId: noteId })
    }
    useEffect(() =>
    {
        if (noteId && isLoadingMoveNoteToTrashId === noteId && isLoadingMoveNoteToTrash) setIsLoadingNoteToTrash(true);
        else setIsLoadingNoteToTrash(false)
    }, [isLoadingMoveNoteToTrashId, noteId, isLoadingMoveNoteToTrash])
    return (
        <Box sx={{ position: "absolute", bottom: 0, right: 0, p: 1 }}>
            {!trash && (
                <>
                    {isLoadingMoveToTrash && <CircularProgress size={19} sx={{ mr: 1, mb: -1 }} />}
                    <IconButton disabled={isLoadingMoveToTrash}
                        onClick={handleMoveNoteToTrash}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton disabled={disabledEditBtn} onClick={handleEditNote}>
                        <EditIcon />
                    </IconButton>
                </>
            )}
        </Box>
        )
}

export default NoteActions