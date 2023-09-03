import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { tasksActions } from '../../store/tasks-slice';
import DoneTasksUi from './DoneTasksUi';
import { Grid } from '@mui/material';
import TaskPanel from './TaskPanel';
const DoneTasks = () =>
{
    const dispatch = useDispatch();
    const {
        isLoading: isLoadingGetDoneTasks,
        sendRequest: getDoneTasks
    } = useHttp();
    const {
        isLoading: isLoadingDeleteDoneTask,
        sendRequest: deleteDoneTask
    } = useHttp();
    const {
        isLoading: isLoadingDeleteAllDoneTasks,
        sendRequest: deleteAllDoneTasks
    } = useHttp();

    const [pagesSize, setPagesSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const doneTasks = useSelector((state) => state.tasks.doneTasks);
    const [isLoadingDeletedTaskId, setIsLoadingDeletedTaskId] = useState(null);
    const [deleteTaskMessage, setDeleteTaskMessage] = useState(null);

    useEffect(() =>
    {
        const getResponse = ({ message, data, totalPages }) =>
        {
            if (message === "success")
            {
                if (data !== "no data to be displayed" && data.length)
                {
                    dispatch(tasksActions.mergeDoneTasks(data))
                }
                if (totalPages !== pagesSize) setPagesSize(totalPages)
            }
        };
        if (currentPage <= pagesSize)
        {
            getDoneTasks(
                {
                    url: `getAlLDoneTasks?page=${currentPage}&size=10`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])

    const handleDeleteTask = (values) =>
    {
        setIsLoadingDeletedTaskId(values._id)
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(tasksActions.deleteDoneTask(values))
                setDeleteTaskMessage(message)
            }
        }
        deleteDoneTask(
            {
                url: `deleteSingleDoneTask`,
                method: "DELETE",
                body: { taskId: values._id }
            },
            getResponse
        );

    }

    const handleDeleteAllDoneTasks = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(tasksActions.deleteAllDoneTasks())
            }
        }
        deleteAllDoneTasks(
            {
                url: `deleteAllDoneTasks`,
                method: "DELETE",
            },
            getResponse
        );

    }
    useEffect(() =>
    {
        if (!isLoadingDeleteDoneTask) setIsLoadingDeletedTaskId(null)
    }, [isLoadingDeleteDoneTask])
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
                sx={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}
            >
                <DoneTasksUi
                    doneTasks={doneTasks}
                    isLoadingGetDoneTasks={isLoadingGetDoneTasks}
                    currentPage={currentPage}
                    pagesSize={pagesSize}
                    setCurrentPage={setCurrentPage}
                    handleDeleteTask={handleDeleteTask}
                    isLoadingDeleteTask={isLoadingDeleteDoneTask}
                    isLoadingDeletedTaskId={isLoadingDeletedTaskId}
                    deleteTaskMessage={deleteTaskMessage}
                    handleDeleteDoneTasks={handleDeleteAllDoneTasks}
                    isLoadingDeleteDoneTasks={isLoadingDeleteAllDoneTasks}
                />
            </Grid>
            <Grid
                item
                xs={0}
                sm={0}
                md={4}
                lg={4}
                xl={4}
                sx={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}
            >
                <TaskPanel done={true}/>
            </Grid>
        </Grid>

    )
}

export default DoneTasks