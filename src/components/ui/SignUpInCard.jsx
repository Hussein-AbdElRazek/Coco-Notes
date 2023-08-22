import { Box } from '@mui/material'
import React from 'react'

const SignUpInCard= (props) =>
{
    return (
        <Box
            id="signUpInPage"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "var(--dark-black)"
            }}
            >
                {props.children}
        </Box>
    )
}

export default SignUpInCard