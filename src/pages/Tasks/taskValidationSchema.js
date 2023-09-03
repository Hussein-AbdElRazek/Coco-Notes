import *  as Yup from 'yup';

export const taskValidationSchema = Yup.object({
    title: Yup.string()
        .required("Required"),
    content: Yup.string()
        .required("Required"),
    
});