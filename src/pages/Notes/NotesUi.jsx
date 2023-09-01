import { Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from "moment/moment";

import NoteDialog from './NoteDialog';
import { notesActions } from '../../store/notes-slice';
import NoteActions from './NoteActions';

const NotesUi = (props) =>
{
    const {
        notes,
        moveNoteToTrash,
        isLoadingGetAllNotes,
        isLoadingMoveNoteToTrashId,
        isLoadingMoveNoteToTrash,
        trash,
        currentPage,
        pagesSize,
        setCurrentPage,
        moveNoteToTrashMessage,
        editNote,
        editNoteMessage,
        isLoadingEditNote,
    } = props;
    const dispatch = useDispatch();
    //for handle pagination
    const observer = useRef();
    const lastNoteRef = useCallback((node) =>
    {
        if (isLoadingGetAllNotes) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =>
        {
            if (entries[0].isIntersecting)
            {
                console.log("bottom");
                if (currentPage < pagesSize) setCurrentPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoadingGetAllNotes, currentPage, pagesSize, setCurrentPage])
    // handle note dialog
    const [noteOpenedData, setNoteOpenedData] = useState({});
    const [noteOpenedDisabled, setNoteOpenedDisabled] = useState(null);
    const handleOpenNote = () =>
    {
        dispatch(notesActions.openNote());
    }
    const handleClickOpen = (note) =>
    {
        setNoteOpenedDisabled(true);
        setNoteOpenedData(note)
        handleOpenNote()
    };
    const handleClickEdit = (note) =>
    {
        setNoteOpenedDisabled(false)
        setNoteOpenedData(note);
        handleOpenNote()
    };

    return (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3 }}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}
            my={3}
        >
            {(notes.length === 0 && !isLoadingGetAllNotes) && <Typography sx={{ width: "100%", textAlign: "center" }}>No notes yet!</Typography>}
            {notes.map(({ noteAbstract, _id, createdAt }, index) => 
            {
                const noteDate = moment(new Date(createdAt)).format("hh:mm A DD/MM/YYYY");
                return (
                    <Grid
                        item
                        xl={2}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={_id}
                    >
                        <Card
                            ref={index + 1 === notes.length ? lastNoteRef : null}
                            className='note'
                            variant="outlined"
                            sx={{ position: "relative", }}

                        >
                            <CardActionArea onClick={() => handleClickOpen({ noteAbstract: noteAbstract, noteId: _id })} sx={{ height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                {/* <CardMedia
                                component="img"
                                image={testImage}
                                alt="Paella dish"
                                height="100"
                            /> */}
                                <CardContent className='note-abstract'
                                    sx={{ width: "100%", height:"100%"}}
                                >
                                    <Typography variant="body1" gutterBottom sx={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'wrap',
                                        maxWidth: '100%',
                                        height:"70%",
                                        overflow: "hidden"
                                    }}  >
                                        {noteAbstract}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize:11, textAlign:"right" }}>
                                        {noteDate}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <NoteActions
                                trash={trash}
                                isLoadingMoveNoteToTrashId={isLoadingMoveNoteToTrashId}
                                isLoadingMoveNoteToTrash={isLoadingMoveNoteToTrash}
                                moveNoteToTrash={moveNoteToTrash}
                                handleClickEdit={handleClickEdit}
                                noteId={_id}
                                noteAbstract={noteAbstract}
                                disabledEditBtn={false}
                            />
                        </Card>
                    </Grid>
                )
            }
            )}
            {isLoadingGetAllNotes && <Box sx={{ width: "100%", textAlign: "center" }}><CircularProgress /></Box>}
            <NoteDialog
                note={noteOpenedData}
                setDisabled={setNoteOpenedDisabled}
                disabled={noteOpenedDisabled}
                moveNoteToTrash={moveNoteToTrash}
                isLoadingMoveNoteToTrashId={isLoadingMoveNoteToTrashId}
                isLoadingMoveNoteToTrash={isLoadingMoveNoteToTrash}
                trash={trash}
                moveNoteToTrashMessage={moveNoteToTrashMessage}
                editNoteMessage={editNoteMessage}
                editNote={editNote}
                isLoadingEditNote={isLoadingEditNote}
            />
        </Grid>
    )
}

export default NotesUi