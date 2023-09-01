import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Box, Paper, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
const AddNoteForm = (props) =>
{
    const { isLoadingAddNote, addNote } = props;
    return (
        <Formik
            initialValues={{ noteAbstract: ""}}
            onSubmit={addNote}
            enableReinitialize
        >
            {(formik) =>
                <Form >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Paper sx={{ display: 'flex', flexDirection: "column", width: "100%", maxWidth: 500, alignSelf: "center" }}
                            elevation={24}
                        >
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
                                            sx={{ maxWidth: 500, ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
                                            multiline
                                            maxRows={6}
                                            {...field}
                                            disabled={isLoadingAddNote}

                                        />
                                    );
                                }}
                            </Field>
                            {formik.values.noteAbstract.trim().length ? (<LoadingButton type="submit" loading={isLoadingAddNote}>Save</LoadingButton>) : null}
                        </Paper>
                    </Box>
                </Form>}
        </Formik>
    )
}

export default AddNoteForm