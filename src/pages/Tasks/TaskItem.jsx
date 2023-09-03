import { Box, Card, CardActionArea, Checkbox, Divider, Typography } from '@mui/material'
import React from 'react'
import TaskActions from './TaskActions';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasks-slice';

const TaskItem = (props) =>
{
    const {
        taskRef,
        task,
        handleDeleteTask,
        isLoadingDeleteTask,
        isLoadingDeletedTaskId,
        deleteTaskMessage,
        handleMakeTaskDone,
        handlePinTask,
    } = props;
    const dispatch = useDispatch();
    const handleOpenTask = () =>
    {
        dispatch(tasksActions.openTask(task));
    }
    return (
        <Box ref={taskRef}>
            <Card sx={{ height: 60, position: "relative" }}>
                <CardActionArea onClick={handleOpenTask} sx={{ "&.MuiCardActionArea-root": { pl: 6, py: 1 } }}>
                    <Typography variant="subtitle2" fontSize={14}>{task.title}</Typography>
                    <Typography variant="body2" fontSize={13}>{task.content}</Typography>
                </CardActionArea>
                <Box sx={{ position: "absolute", left: "0px", bottom: "0px", height: "100%", display: "flex", alignItems: "center" }}>
                    <Checkbox onClick={() => handleMakeTaskDone(task)} />
                </Box>
                <TaskActions
                    handleDeleteTask={handleDeleteTask}
                    isLoadingDeleteTask={isLoadingDeleteTask}
                    isLoadingDeletedTaskId={isLoadingDeletedTaskId}
                    deleteTaskMessage={deleteTaskMessage}
                    taskId={task._id}
                    isPinned={task.isPined}
                    handlePinTask={handlePinTask}
                    task={task}
                />
            </Card>
            <Divider sx={{ backgroundColor: "var(--blue)" }} />
        </Box>
    )
}

export default TaskItem