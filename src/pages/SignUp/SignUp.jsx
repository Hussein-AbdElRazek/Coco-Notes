import React from 'react'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import SignUpUi from './SignUpUi';

const SignUp = () =>
{
    const navigate = useNavigate();
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const {
        isLoading: isLoadingSignUp,
        sendRequest: signUp
    } = useHttp();

    const handleSignUp = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success and a verfication mail was sent")
            {
                popMessage("Account created successfully", {
                    variant: "success",
                });
                navigate("/login", { replace: true });
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
    }
    return (
        <SignUpUi
            isLoadingSignUp={isLoadingSignUp}
            handleSignUp={handleSignUp}
        />
    )
}

export default SignUp