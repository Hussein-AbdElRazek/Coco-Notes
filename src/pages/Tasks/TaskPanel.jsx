import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';

import useHttp from '../../hooks/use-http';
import { tasksActions } from '../../store/tasks-slice';
import { taskValidationSchema } from './taskValidationSchema';
import TaskForm from './TaskForm'

const TaskPanel = ({ done }) =>
{
    const task = useSelector((state) => state.tasks.openedTask)
    const isEdit = useSelector((state) => state.tasks.isEdit)
    const [disabled, setDisabled] = useState(!isEdit)
    const {
        isLoading: isLoadingEditTask,
        sendRequest: editTask,
    } = useHttp();
    const dispatch = useDispatch();
    const handleUnDisable = () =>
    {
        setDisabled(false)
    }
    const handleDisable = () =>
    {
        setDisabled(true)
    }
    const handleEditTask = (values) =>
    {
        const submitData = {
            title: values.title,
            content: values.content,
            taskId: values._id,
        }
        const getResponse = ({ msesage }) =>
        {
            if (msesage === "success")
            {
                console.log('values', values)
                dispatch(tasksActions.updateTask(values))
                handleDisable()
            }
        }
        editTask(
            {
                url: `editTask`,
                method: "PUT",
                body: submitData
            },
            getResponse
        );
    }
    useEffect(() =>
    {
        setDisabled(!isEdit)
    }, [setDisabled, isEdit])
    return (
        <Box
            className="task-panel"
            pl={1}
            pt={1}
            sx={{
                height: "calc(100vh - 100px)",
                overflowY: "scroll",

            }}
        >
            <TaskForm
                initialValues={task}
                disabled={disabled}
                onSubmit={handleEditTask}
                validationSchema={taskValidationSchema}
                panel={true}
            >
                {!done &&
                    (!disabled ? (
                        <Box sx={{ position: "absolute", bottom: "15px", right: "15px", }}>
                            <Button type="button" onClick={handleDisable}>
                                Cancel
                            </Button>
                            <LoadingButton disabled={isLoadingEditTask} loading={isLoadingEditTask} type="submit" >
                                Save
                            </LoadingButton>
                        </Box>
                    ) : (
                        <Box sx={{ position: "absolute", bottom: "15px", right: "15px", }}>
                            <IconButton disabled={!disabled || !task.content} onClick={handleUnDisable}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    )
                    )}


            </TaskForm>
        </Box>
    )
}

export default TaskPanel