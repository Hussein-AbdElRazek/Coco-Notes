import React, { useCallback, useRef } from 'react'
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LoopOnTasks from './LoopOnTasks';

const DoneTasksUi = (props) =>
{
    const {
        doneTasks,
        isLoadingGetDoneTasks,
        currentPage,
        pagesSize,
        setCurrentPage,
        handleDeleteTask,
        isLoadingDeleteTask,
        isLoadingDeletedTaskId,
        deleteTaskMessage,
        handleDeleteDoneTasks,
        isLoadingDeleteDoneTasks
    } = props;
    //for handle pagination
    const observer = useRef();
    const lastTaskRef = useCallback((node) =>
    {
        if (isLoadingGetDoneTasks) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =>
        {
            if (entries[0].isIntersecting)
            {
                if (currentPage < pagesSize) setCurrentPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoadingGetDoneTasks, currentPage, pagesSize, setCurrentPage])
    return (
        <Box
            ml={1}
        >
            {(doneTasks.length) ? (<LoadingButton sx={{ mt: 2 }} color="error"
                onClick={handleDeleteDoneTasks} loading={isLoadingDeleteDoneTasks}>Delete All Done Tasks</LoadingButton>) : null}
            {(!doneTasks.length && !isLoadingGetDoneTasks) && (
                <Typography sx={{ width: "100%", textAlign: "center", mt: 2 }}>No tasks yet!</Typography>
            )}

            <LoopOnTasks
                tasks={doneTasks}
                lastTaskRef={lastTaskRef}
                handleDeleteTask={handleDeleteTask}
                isLoadingDeleteTask={isLoadingDeleteTask}
                isLoadingDeletedTaskId={isLoadingDeletedTaskId}
                deleteTaskMessage={deleteTaskMessage}
                isLoadingGetAllTasks={isLoadingGetDoneTasks}
                category="Done"
                done={true}
            />
        </Box>
    )
}

export default DoneTasksUi