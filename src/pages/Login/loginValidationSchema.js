import *  as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid e-mail")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
});