import { Field, Formik, Form } from "formik";
import { HospitalEntry, Diagnose } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "@material-ui/core";



interface Props {
    onSubmit: (values: HospitalEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnose[];
    set: (values: string[]) => void;
  }

const AddEntryForm = ({ onSubmit, onCancel, diagnoses, set }: Props) => {

    return (
      <Formik
        initialValues={{
            id: "",
            type: "Hospital",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes:[],
            discharge: {
                date: "",
                criteria:""
            }
        }}
        onSubmit={onSubmit}
        validate={
          /// ...
          (values) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.discharge.criteria) {
              errors.discharge = requiredError;
            }
            if (!values.discharge.date) {
              errors.discharge = requiredError;
            }
            return errors;
          }
        }
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched}) => {
        return (
          <Form className="form ui">
             
  
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="description"
              placeholder="desc"
              name="description"
              component={TextField}
            />

            <Field
              label="specialist"
              placeholder="spec"
              name="specialist"
              component={TextField}
            />

            <Field
              label="disDate"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />

            <Field
              label="disCrit"
              placeholder="criteria"
              name="discharge.criteria"
              component={TextField}
            />

            <Field
              label="id"
              placeholder="id"
              name="id"
              component={TextField}
            />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            set = {set}
          />    

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddEntryForm;