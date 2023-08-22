import React from 'react'
import FormikControl from '../components/formik/FormikControl';

export const LoopOnInputs = (props) =>
{
    const { inputs, disabled } = props;
    return (
        <>
            {inputs.map(({name,...input}) => (
                <FormikControl
                    key={name}
                    name={name}
                    disabled={disabled}
                    {...input}
                />
            ))}
        </>
    )
}
