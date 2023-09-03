import React from 'react'
import { LoadingButton } from '@mui/lab';
import { addTaskInitialValues } from './taskData';
import { taskValidationSchema } from './taskValidationSchema';
import TaskForm from './TaskForm';
import { Paper } from '@mui/material';

const AddTaskUi = (props) =>
{
    const { addTask, isLoadingAddTask } = props;
    return (
        <Paper >
<TaskForm
            initialValues={addTaskInitialValues}
            validationSchema={taskValidationSchema}
            onSubmit={addTask}
            enableReinitialize
        >
            <LoadingButton type="submit" loading={isLoadingAddTask}>Save</LoadingButton>
        </TaskForm>
        </Paper>
        

    )
}

export default AddTaskUi