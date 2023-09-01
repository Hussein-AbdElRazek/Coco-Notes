import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Link, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import SignUpInCard from '../../components/ui/SignUpInCard'
import FormCard from '../../components/ui/FormCard'
import { LoopOnInputs } from '../../helpers/LoopOnInputs'
import FormContainer from '../../components/formik/FormContainer'
import { loginInitialValues, loginInputs } from './loginInputsData'
import { loginValidationSchema } from './loginValidationSchema'
import FormBackground from '../../components/ui/FormBackground'
import LoginBackground from './assets/loginBackground.svg'
const LoginUi = (props) =>
{
    const { handleLogin, isLoadingLogin } = props;
    return (
        <SignUpInCard>
            <FormCard>
                <FormContainer
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                >
                    <LoopOnInputs inputs={loginInputs} />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        loading={isLoadingLogin}
                    >
                        Login
                    </LoadingButton>
                    <Typography variant="body2" mt={2}>
                        {"Don't have an account? "}
                        <Link component={NavLink} to="/signup">
                            Sign Up
                        </Link>
                    </Typography>
                </FormContainer>
            </FormCard>
            {/* <FormBackground img={LoginBackground}/> */}
        </SignUpInCard>
    )
}

export default LoginUi