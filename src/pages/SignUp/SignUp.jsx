import React from 'react'
import { useSnackbar } from 'notistack';

import useHttp from '../../hooks/use-http';
import SignUpUi from './SignUpUi';

const SignUp = () =>
{
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const {
        isLoading: isLoadingSignUp,
        sendRequest: signUp
    } = useHttp();

    const handleSignUp = (values, { resetForm }) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success and a verfication mail was sent")
            {
                popMessage("Account created successfully", {
                    variant: "success",
                });
                resetForm();
            }
        };
        signUp(
            {
                url: "signUp",
                method: "POST",
                body: values,
            },
            getResponse
        );
        console.log("v", values)
    }
    return (
        <SignUpUi
            isLoadingSignUp={isLoadingSignUp}
            handleSignUp={handleSignUp}
        />
    )
}

export default SignUp