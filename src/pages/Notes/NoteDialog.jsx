import React, { useCallback, useEffect, useRef } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import *  as Yup from 'yup';

import { notesActions } from '../../store/notes-slice';
import NoteActions from './NoteActions';

const NoteDialog = (props) =>
{
    const {
        note,
        trash,
        isLoadingMoveNoteToTrashId,
        isLoadingMoveNoteToTrash,
        moveNoteToTrash,
        disabled,
        setDisabled,
        editNote,
        isLoadingEditNote,
        moveNoteToTrashMessage,
        editNoteMessage,
    } = props;
    const noteAbstractRef = useRef(null);
    const dispatch = useDispatch();

    const handleEdit = () =>
    {
        setDisabled(false)
        noteAbstractRef.current.focus();
    }

    const handleSubmitEditNote = (values) =>
    {
        editNote(values);
    }

    const handleClose = useCallback(() =>
    {
        dispatch(notesActions.closeNote());
    }, [dispatch])

    const isNoteOpen = useSelector((state) => state.notes.isNoteOpened)

    useEffect(() =>
    {
        if (moveNoteToTrashMessage === "success") handleClose();
    }, [moveNoteToTrashMessage, handleClose])

    useEffect(() =>
    {
        if (editNoteMessage === "success") handleClose();
    }, [isLoadingEditNote, editNoteMessage, handleClose])

    const validationSchema = Yup.object({
        noteAbstract: Yup.string()
            .required("Required"),
    });
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="note-dialog"
            open={isNoteOpen}
            sx={{ minHeight: 400, overflow: 'scroll' }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {disabled ? "Note Details" : "Note Edit"}

            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers >
                <Formik
                    initialValues={note}
                    onSubmit={handleSubmitEditNote}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {(formik) =>
                        <Form >
                            <Field
                                name="noteAbstract">
                                {({ field, form }) =>
                                {
                                    return (
                                        <TextField
                                            name="noteAbstract"
                                            id="noteAbstract"
                                            type="input"
                                            label="Note Abstract"
                                            fullWidth
                                            sx={{
                                                maxWidth: 500,
                                                minWidth: 400,
                                                minHeight: 100,
                                                // width:"100%",
                                                mb: 5
                                            }}
                                            multiline
                                            maxRows={6}
                                            {...field}
                                            disabled={disabled}
                                            inputRef={noteAbstractRef}
                                            error={form.errors.noteAbstract && form.touched.noteAbstract ?
                                                true : false}
                                            helperText={form.errors.noteAbstract && form.touched.noteAbstract ?
                                                form.errors.noteAbstract : " "}
                                        />
                                    );
                                }}
                            </Field>
                            {!disabled && (
                                <DialogActions sx={{ marginBottom: 3, marginRight: -3 }}>
                                    <LoadingButton type="button" onClick={handleClose}>
                                        Cancel
                                    </LoadingButton>
                                    <LoadingButton loading={isLoadingEditNote} type="submit" >
                                        Save
                                    </LoadingButton>
                                </DialogActions>
                            )}
                            <NoteActions
                                trash={trash}
                                isLoadingMoveNoteToTrashId={isLoadingMoveNoteToTrashId}
                                isLoadingMoveNoteToTrash={isLoadingMoveNoteToTrash}
                                moveNoteToTrash={moveNoteToTrash}
                                handleClickEdit={handleEdit}
                                noteId={note.noteId}
                                noteAbstract={note.noteAbstract}
                                disabledEditBtn={!disabled}
                            />
                        </Form>}
                </Formik>
            </DialogContent>

        </Dialog>
    )
}

export default NoteDialog