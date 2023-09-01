import React from 'react'
import Navbar, { drawerWidth } from '../../components/navbar/Navbar'
import { Box, Toolbar } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Notes from '../Notes/Notes'
import Trash from '../Notes/Trash'

const Home = () =>
{
  return (
    <div>
      <Navbar>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Routes>
            <Route index element={<Navigate to="notes" replace={true} />} />
            <Route path='notes' element={<Notes />} />
            <Route path='notes/trash' element={<Trash />} />
          </Routes>
        </Box>
      </Navbar>
    </div>
  )
}

export default Home