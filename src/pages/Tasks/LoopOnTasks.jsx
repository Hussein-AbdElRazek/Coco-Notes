import { Box, CircularProgress, Typography } from '@mui/material';
import TaskItem from './TaskItem';

const LoopOnTasks = (props) =>
{
    const {
        tasks,
        isLoadingDeleteTask,
        handleDeleteTask,
        isLoadingDeletedTaskId,
        deleteTaskMessage,
        handlePinTask,
        handleMakeTaskDone,
        lastTaskRef,
        isLoadingGetAllTasks,
        category
    } = props;
    return (

        <Box sx={{ mt: 3 }} >
            {tasks.length ? (<Typography mb={1} ml={1}>{`${category} Tasks`}</Typography>):null}
            {tasks.map((task, index) =>
            {
                return (
                    <TaskItem
                        taskRef={tasks.length === index + 1 ? lastTaskRef : null}
                        task={task}
                        handleDeleteTask={handleDeleteTask}
                        isLoadingDeleteTask={isLoadingDeleteTask}
                        isLoadingDeletedTaskId={isLoadingDeletedTaskId}
                        deleteTaskMessage={deleteTaskMessage}
                        handleMakeTaskDone={handleMakeTaskDone}
                        handlePinTask={handlePinTask}
                        key={task._id}
                    />
                )
            })}
            {isLoadingGetAllTasks && <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }} ><CircularProgress /></Box >}
        </Box>
    )
}

export default LoopOnTasks