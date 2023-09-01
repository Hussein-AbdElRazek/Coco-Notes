import React from 'react'
import AddNote from './AddNote'
import { Box } from '@mui/material'
import AllNotes from './AllNotes'

const Notes = () =>
{
    return (
        <>
            <AddNote />
            <AllNotes />
        </>
    )
}

export default Notes