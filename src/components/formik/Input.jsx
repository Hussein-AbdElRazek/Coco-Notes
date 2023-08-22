import React from "react";
import { Field } from "formik";
import { Box, TextField } from "@mui/material";

function Input(props)
{
    const {
        label,
        name,
        type,
        disabled,
        ...rest
    } = props;


    return (
        <Box mb={0.5} >
            <Field
                name={name}>
                {({ field, form }) =>
                {
                    return (
                        <TextField
                            name={name}
                            id={name}
                            type={type}
                            label={label}
                            disabled={disabled}
                            error={form.errors[name] && form.touched[name] ?
                                true : false}
                            helperText={form.errors[name] && form.touched[name] ?
                                form.errors[name] : " "}
                            fullWidth
                            //TODO handle label at center
                            inputProps={{ style: { height: 18,
                                // color:"var(--white)" 
                            } }}
                            variant="outlined"
                            {...field}
                            {...rest}
                            // sx={{
                            //     ".MuiOutlinedInput-notchedOutline":{
                            //         borderColor:"var(--white)"
                            //     },
                            //     "& .MuiFormLabel-root-MuiInputLabel-root":{
                            //         color:"var(--white)"
                            //     },
                            // }}
                        />
                    );
                }}
            </Field>

        </Box>
    );
}

export default Input;
