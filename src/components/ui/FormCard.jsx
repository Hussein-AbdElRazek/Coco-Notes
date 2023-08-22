import { Box, Card } from '@mui/material'
import React from 'react'

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
                {props.children}
            </Card>
        </Box>
    )
}

export default FormCard