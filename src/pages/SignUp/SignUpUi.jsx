import React from 'react'
import { Link, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { NavLink } from 'react-router-dom';

import FormContainer from '../../components/formik/FormContainer'
import { LoopOnInputs } from '../../helpers/LoopOnInputs';
import { signUpInitialValues, signUpInputs } from './signUpInputsData';
import { signUpValidationSchema } from './signUpValidationSchema';
import signUpBackground from './assets/signUpBackground.svg'
import FormCard from '../../components/ui/FormCard';
import SignUpInCard from '../../components/ui/SignUpInCard';
import FormBackground from '../../components/ui/FormBackground';
const SignUpUi = (props) =>
{
  const { handleSignUp, isLoadingSignUp } = props;
  return (
    <SignUpInCard>
      <FormCard>
        <FormContainer
          initialValues={signUpInitialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSignUp}
        >
          <LoopOnInputs
            inputs={signUpInputs}
            disabled={isLoadingSignUp} />
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoadingSignUp}
          >
            Sign Up
          </LoadingButton>
          <Typography variant="body2" mt={2}>
            {"Have an account already? "}
            <Link component={NavLink} to="/login">
              Login
            </Link>
          </Typography>
        </FormContainer>
      </FormCard>

      <FormBackground img={signUpBackground} />
    </SignUpInCard >
  )
}

export default SignUpUi