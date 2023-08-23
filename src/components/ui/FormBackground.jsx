import { Box } from '@mui/material'
import React from 'react'

const FormBackground = (props) =>
{
    const { img } = props
    return (
        <Box id="signUpBackground" sx={{
            width: "50%", height: "100vh", display: "flex", alignItems: "center",

        }}>
            <img src={img} alt="Background" style={{ width: "90%", }} />
            <a
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    fontSize: 10
                }}
                href="https://storyset.com/user" target='blank'>
                User illustrations by Storyset
            </a>
        </Box>
    )
}

export default FormBackground