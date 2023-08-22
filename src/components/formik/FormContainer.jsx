import React from "react";
import { Form, Formik } from "formik";

const FormContainer = (props) =>
{
    const { 
        initialValues, 
        validationSchema, 
        onSubmit, 
        enableReinitialize, 
        children } = props;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
        >
            {(formik) => <Form >{children}</Form>}
        </Formik>
    );
}

export default FormContainer;
