import { createSlice } from '@reduxjs/toolkit';
import { mergeToUnique } from '../helpers/mergeToUnique';


const initialTasksState = {
    tasks: [],
    pinedTasks: [],
    openedTask: { title: "", content: "" },
    isEdit: false,
    doneTasks: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        addTask(state, action)
        {
            if (action.payload.isPined) state.pinedTasks.push(action.payload);
            else state.tasks.push(action.payload)
        },
        mergeTasks(state, action)
        {
            state.tasks = mergeToUnique(state.tasks, action.payload.filter(ele => !ele.isPined));
            state.pinedTasks = mergeToUnique(state.pinedTasks, action.payload.filter(ele => ele.isPined));
        },
        removeTask(state, action)
        {
            if (action.payload.isPined)
            {
                state.pinedTasks = state.pinedTasks.filter(ele => ele._id !== action.payload._id)
            } else
            {
                state.tasks = state.tasks.filter(ele => ele._id !== action.payload._id)
            }
        },
        updateTask(state, action)
        {
            console.log('action.payload', action.payload)
            if (action.payload.isPined)
            {
                state.pinedTasks = state.pinedTasks.map(ele =>
                {
                    if (ele._id === action.payload._id)
                    {
                        console.log("found in pinned tasks")
                        return { ...ele, ...action.payload }
                    }
                    else return ele;
                })
            } else
            {
                state.tasks = state.tasks.map(ele =>
                {
                    if (ele._id === action.payload._id)
                    {
                        console.log("found in unpinned tasks")

                        return { ...ele, ...action.payload }
                    }
                    else return ele;
                })
            }
        },
        markPined(state, action)
        {
            let unpinnedTasks = []
            state.tasks.forEach(task =>
            {
                if (task._id === action.payload.taskId)
                {
                    task.isPined = true;
                    state.pinedTasks.push(task);
                }
                else unpinnedTasks.push(task)
            })
            state.tasks = unpinnedTasks;
        },
        openTask(state, action)
        {
            state.openedTask = action.payload;
        },
        closeTask(state)
        {
            state.openedTask = {};
        },
        handleOpenEdit(state)
        {
            state.isEdit = true;
        },
        handleCloseEdit(state)
        {
            state.isEdit = false;
        },
        handleRemoveAllTasks(state)
        {
            state.tasks = [];
            state.pinedTasks = [];
        },
        deleteDoneTask(state, action)
        {
            state.doneTasks = state.doneTasks.filter(ele => ele._id !== action.payload._id)
        },
        deleteAllDoneTasks(state)
        {
            state.doneTasks = [];
        },
        mergeDoneTasks(state, action)
        {
            state.doneTasks = mergeToUnique(state.doneTasks, action.payload);
        }

    }
})


export const tasksActions = tasksSlice.actions

export default tasksSlice;