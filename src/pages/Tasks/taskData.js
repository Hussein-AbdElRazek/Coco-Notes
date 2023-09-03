export const addTaskInputsData = [
    {
        control: "input",
        type: "text",
        name: "title",
        label: "Task Title",
    },
    {
        control: "textarea",
        name: "content",
        label: "Task Description",
        rows: 3,
    },
]
export const taskPanelInputsData = [
    {
        control: "input",
        type: "text",
        name: "title",
        label: "Task Title",
    },
    {
        control: "textarea",
        name: "content",
        label: "Task Description",
    },
]

export const addTaskInitialValues = {
    title: "",
    content: "",
}
export const taskInitialValues = {
    _id: "",
    title: "",
    content: "",
    isPined: "",
}