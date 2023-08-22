export const signUpInputs = [
    {
        control:"input",
        type:"text",
        name:"userName",
        label:"User Name",
    },
    {
        control:"input",
        type:"email",
        name:"email",
        label:"Email",
    },
    {
        control:"input",
        type:"password",
        name:"password",
        label:"Password",
    },
    {
        control:"input",
        type:"password",
        name:"confirmPassword",
        label:"Confirm Password",
    },
];

export const signUpInitialValues = {
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
}