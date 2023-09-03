import { Box, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasks-slice';

const TaskActions = (props) =>
{
    const {
        isLoadingDeleteTask,
        handleDeleteTask,
        isLoadingDeletedTaskId,
        taskId,
        handlePinTask,
        isPinned,
        task,
    } = props;
    const [deleteDisabled, setDeleteDisabled] = useState(false);
    useEffect(() =>
    {
        (isLoadingDeleteTask && isLoadingDeletedTaskId === taskId) ? setDeleteDisabled(true) : setDeleteDisabled(false)
    }, [isLoadingDeleteTask, isLoadingDeletedTaskId, taskId])
    const dispatch = useDispatch();
    const handleEditTask = () =>
    {
        dispatch(tasksActions.openTask(task));
        dispatch(tasksActions.handleOpenEdit());
    }
    return (
        <Box sx={{ position: "absolute", bottom: 0, right: 0, p: 1 }}>
            {(
                <>
                    {deleteDisabled && <CircularProgress size={19} sx={{ mr: 1, mb: -1 }} />}
                    <IconButton disabled={deleteDisabled}
                        onClick={() => handleDeleteTask(task)}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton className='sm-hidden' onClick={handleEditTask}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handlePinTask({ taskId: taskId })} disabled={isPinned}>
                        <PushPinIcon sx={{ color: isPinned ? "var(--blue)" : "var(--white)" }} />
                    </IconButton>
                </>
            )}
        </Box>
    )
}

export default TaskActions