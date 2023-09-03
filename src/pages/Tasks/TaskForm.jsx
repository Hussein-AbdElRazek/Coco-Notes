import FormContainer from '../../components/formik/FormContainer';
import { Paper } from '@mui/material';
import { LoopOnInputs } from '../../helpers/LoopOnInputs';
import { addTaskInputsData } from './taskData';
import { taskPanelInputsData } from './taskData';
import { taskValidationSchema } from './taskValidationSchema';
const TaskForm = (props) =>
{
    const { children, onSubmit, initialValues, disabled, panel } = props;

    return (
        <FormContainer
            initialValues={initialValues}
            validationSchema={taskValidationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Paper  sx={{ display: 'flex', flexDirection: "column", width: "100%", alignSelf: "center" }}
            >
                <LoopOnInputs inputs={panel===true ? taskPanelInputsData : addTaskInputsData} disabled={disabled} />
                {children}
            </Paper>
        </FormContainer>
    )
}

export default TaskForm