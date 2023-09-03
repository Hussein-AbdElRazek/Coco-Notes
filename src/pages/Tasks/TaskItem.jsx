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
        done,
    } = props;
    const dispatch = useDispatch();
    const handleOpenTask = () =>
    {
        dispatch(tasksActions.openTask(task));
    }
    return (
        <Box ref={taskRef}>
            <Card sx={{ height: 60, position: "relative", }}>
                <CardActionArea onClick={handleOpenTask} sx={{ "&.MuiCardActionArea-root": { pl: 6, py: 2,  } }}>
                    <Typography maxWidth="90%" variant="subtitle2" fontSize={14}>{task.title}</Typography>
                    <Typography maxWidth="90%" variant="body2" fontSize={13}>{task.content}</Typography>
                </CardActionArea>
                <Box sx={{ position: "absolute", left: "0px", bottom: "0px", height: "100%", display: "flex", alignItems: "center" }}>
                    <Checkbox checked={done} disabled={done} onClick={() => handleMakeTaskDone(task)} />
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
                    done={done}
                />
            </Card>
            <Divider sx={{ backgroundColor: "var(--blue)" }} />
        </Box>
    )
}

export default TaskItem