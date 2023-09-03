import { TextField } from '@mui/material';
import { Field } from 'formik';
import React from 'react'

const TextArea = (props) =>
{
    const { name, label, border, disabled, maxRows, rows } = props;
    return (
        <Field
            name={name}>
            {({ field, form }) =>
            {
                return (
                    <TextField
                        name={name}
                        id={name}
                        type="input"
                        label={label}
                        fullWidth
                        sx={{ ".MuiOutlinedInput-notchedOutline": border === true ? {} : { border: "none" } }}
                        multiline
                        maxRows={maxRows ? maxRows:null}
                        rows={rows ? rows:null}
                        {...field}
                        disabled={disabled}
                        error={form.errors[name] && form.touched[name] ?
                            true : false}
                        helperText={form.errors[name] && form.touched[name] ?
                            form.errors[name] : " "}
                    />
                );
            }}
        </Field>
    )
}

export default TextArea