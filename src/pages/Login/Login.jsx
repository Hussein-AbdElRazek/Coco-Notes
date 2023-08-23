import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import LoginUi from './LoginUi'
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';

const Login = () =>
{
    const navigate = useNavigate();
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const {
        isLoading: isLoadingLogin,
        sendRequest: login
    } = useHttp();
    const authCtx = useContext(AuthContext);

    const handleLogin = (values) =>
    {
        const getResponse = ({ message, token }) =>
        {
            if (message === "success")
            {
                popMessage("Login successfully", {
                    variant: "success",
                });
                authCtx.logIn(token)
                navigate("/", { replace: true });
            }
        };

        login(
            {
                url: "login",
                method: "post",
                body: values,
            },
            getResponse
        );
    }
    
    return (
        <LoginUi
            handleLogin={handleLogin}
            isLoadingLogin={isLoadingLogin}
        />
    )
}

export default Login