import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { tasksActions } from '../../store/tasks-slice';
import TasksUi from './TasksUi';

const AllTasks = () =>
{
    const dispatch = useDispatch();
    const {
        isLoading: isLoadingGetAllTasks,
        sendRequest: getAllTasks
    } = useHttp();
    const {
        isLoading: isLoadingDeleteTask,
        sendRequest: deleteTask
    } = useHttp();
    const {
        isLoading: isLoadingDeleteAllTasks,
        sendRequest: deleteAllTasks
    } = useHttp();
    const {
        sendRequest: pinTask
    } = useHttp();
    const {
        sendRequest: makeTaskDone
    } = useHttp();

    const [pagesSize, setPagesSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const tasks = useSelector((state) => state.tasks.tasks);
    const pinedTasks = useSelector((state) => state.tasks.pinedTasks);
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
                    dispatch(tasksActions.mergeTasks(data))
                }
                if (totalPages !== pagesSize) setPagesSize(totalPages)
            }
        };
        if (currentPage <= pagesSize)
        {
            getAllTasks(
                {
                    url: `getAllTasks?page=${currentPage}&size=10`,
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
                dispatch(tasksActions.removeTask(values))
                setDeleteTaskMessage(message)
            }
        }
        deleteTask(
            {
                url: `deleteTask`,
                method: "DELETE",
                body: { taskId: values._id }
            },
            getResponse
        );

    }
    const handlePinTask = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(tasksActions.markPined(values))
            }
        }
        pinTask(
            {
                url: `markAsPinned`,
                method: "PUT",
                body: values
            },
            getResponse
        );

    }
    const handleMakeTaskDone = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(tasksActions.removeTask(values))
            }
        }
        makeTaskDone(
            {
                url: `markAsDone`,
                method: "POST",
                body: { taskId: values._id }
            },
            getResponse
        );

    }
    const handleDeleteAllTasks = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                dispatch(tasksActions.handleRemoveAllTasks())
            }
        }
        deleteAllTasks(
            {
                url: `deletAllTasks`,
                method: "DELETE",
            },
            getResponse
        );

    }
    useEffect(() =>
    {
        if (!isLoadingDeleteTask) setIsLoadingDeletedTaskId(null)
    }, [isLoadingDeleteTask])
    return (
        <TasksUi
            tasks={tasks}
            pinedTasks={pinedTasks}
            isLoadingGetAllTasks={isLoadingGetAllTasks}
            currentPage={currentPage}
            pagesSize={pagesSize}
            setCurrentPage={setCurrentPage}
            handleDeleteTask={handleDeleteTask}
            isLoadingDeleteTask={isLoadingDeleteTask}
            isLoadingDeletedTaskId={isLoadingDeletedTaskId}
            deleteTaskMessage={deleteTaskMessage}
            handlePinTask={handlePinTask}
            handleMakeTaskDone={handleMakeTaskDone}
            handleDeleteAllTasks={handleDeleteAllTasks}
            isLoadingDeleteAllTasks={isLoadingDeleteAllTasks}
        />
    )
}

export default AllTasks