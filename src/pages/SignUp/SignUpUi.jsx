import React from 'react'
import { Box, Card } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import FormContainer from '../../components/formik/FormContainer'
import { LoopOnInputs } from '../../helpers/LoopOnInputs';
import { signUpInitialValues, signUpInputs } from './signUpInputsData';
import { signUpValidationSchema } from './signUpValidationSchema';
import signUpBackground from './assets/signUpBackground2.svg'
import BigLogo from '../../components/ui/BigLogo';
import FormCard from '../../components/ui/FormCard';
import SignUpInCard from '../../components/ui/SignUpInCard';
const SignUpUi = (props) =>
{
  const { handleSignUp, isLoadingSignUp } = props;
  return (
    <SignUpInCard>
      <FormCard>
        <BigLogo />
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
        </FormContainer>
      </FormCard>

      <Box id="signUpBackground" sx={{
        width: "50%", height: "100vh", display: "flex", alignItems: "center",
      }}>
        <img src={signUpBackground} alt="Sign Up Background" style={{ width: "90%", }} />
      </Box>
    </SignUpInCard >
  )
}

export default SignUpUi