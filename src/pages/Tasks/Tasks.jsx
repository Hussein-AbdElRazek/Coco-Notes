import React from 'react'
import AddTask from './AddTask'
import AllTasks from './AllTasks'
import { Box, Grid } from '@mui/material'
import TaskPanel from './TaskPanel'
const Tasks = () =>
{
  return (
    <Grid
      container
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        pt={1}
      >
        <Box pl={1}>
          <AddTask />
          <AllTasks />
        </Box>
      </Grid>
      <Grid
        item
        xs={0}
        sm={0}
        md={4}
        lg={4}
        xl={4}
      >
        <TaskPanel />
      </Grid>
    </Grid>
  )
}

export default Tasks