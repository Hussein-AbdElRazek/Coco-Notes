import React from "react";
import Input from "./Input";
// import TextArea from "./TextArea";
// import RadioButtons from "./RadioButtons";
function FormikControl(props)
{
    const { control, ...rest } = props;
    switch (control)
    {
        case "input":
            return <Input {...rest} />;
        // case "textarea":
        //     return <TextArea {...rest} />;
        // case "radio":
        //     return <RadioButtons {...rest} />;
        default:
            return null;
    }
}

export default FormikControl;
