import React, { useCallback, useRef } from 'react'
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LoopOnTasks from './LoopOnTasks';

const TasksUi = (props) =>
{
    const {
        tasks,
        pinedTasks,
        isLoadingGetAllTasks,
        currentPage,
        pagesSize,
        setCurrentPage,
        isLoadingDeleteTask,
        handleDeleteTask,
        isLoadingDeletedTaskId,
        deleteTaskMessage,
        handlePinTask,
        handleMakeTaskDone,
        handleDeleteAllTasks,
        isLoadingDeleteAllTasks,
    } = props;
    //for handle pagination
    const observer = useRef();
    const lastTaskRef = useCallback((node) =>
    {
        if (isLoadingGetAllTasks) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =>
        {
            if (entries[0].isIntersecting)
            {
                if (currentPage < pagesSize) setCurrentPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoadingGetAllTasks, currentPage, pagesSize, setCurrentPage])
    const tasksCategories = ["Pinned", "Unpinned"];
    return (
        <Box
            sx={{
                height: "44vh",
                overflowY: 'scroll',
            }}
        >
            {(tasks.length || pinedTasks.length) ? (<LoadingButton sx={{ mt: 2 }} color="error"
                onClick={handleDeleteAllTasks} loading={isLoadingDeleteAllTasks}>Delete All Tasks</LoadingButton>) : null}
            {(!tasks.length && !pinedTasks.length && !isLoadingGetAllTasks) && (
                <Typography sx={{ width: "100%", textAlign: "center", mt: 2 }}>No tasks yet!</Typography>
            )}
            {tasksCategories.map(category => (
                <LoopOnTasks
                    tasks={category === "Pinned" ? pinedTasks : tasks}
                    lastTaskRef={lastTaskRef}
                    handleDeleteTask={handleDeleteTask}
                    isLoadingDeleteTask={isLoadingDeleteTask}
                    isLoadingDeletedTaskId={isLoadingDeletedTaskId}
                    deleteTaskMessage={deleteTaskMessage}
                    handleMakeTaskDone={handleMakeTaskDone}
                    handlePinTask={handlePinTask}
                    isLoadingGetAllTasks={isLoadingGetAllTasks}
                    category={category}
                    key={category}
                />
            ))}
        </Box>
    )
}

export default TasksUi