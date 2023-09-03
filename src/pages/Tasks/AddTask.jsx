import React from 'react'
import AddTaskUi from './AddTaskUi'
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { tasksActions } from '../../store/tasks-slice';

const AddTask = () =>
{
    const dispatch = useDispatch();
    const {
        isLoading: isLoadingAddTask,
        sendRequest: addTask
    } = useHttp();
    const handleAddTask = (values, { resetForm }) =>
    {
        const getResponse = ({ msesage, taskId }) =>
        {
            if (msesage === "success")
            {
                values._id = taskId;
                dispatch(tasksActions.addTask(values))
                resetForm();
            }
        };
        addTask(
            {
                url: "addTask",
                method: "POST",
                body: values,
            },
            getResponse
        );
    }
    return (
        <AddTaskUi isLoadingAddTask={isLoadingAddTask} addTask={handleAddTask} />
    )
}

export default AddTask