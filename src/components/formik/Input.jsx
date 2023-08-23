import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

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
                        inputProps={{
                            style: {
                                height: 18,
                            }
                        }}
                        variant="outlined"
                        sx={{ mb: 1 }}
                        {...field}
                        {...rest}
                    />
                );
            }}
        </Field>
    );
}

export default Input;
