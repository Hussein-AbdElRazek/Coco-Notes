import React from 'react'
import { Box, Card } from '@mui/material'

import BigLogo from './BigLogo'

const FormCard = (props) =>
{
    return (
        <Box
            id="form"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    width: "350px",
                    borderRadius: 5,
                    p: 5,
                    backgroundColor: "var(--dark-grey)"
                }}>
                <BigLogo />
                {props.children}
            </Card>
        </Box>
    )
}

export default FormCard