import { Field, Formik, Form } from "formik";
import { Diagnose, OccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "@material-ui/core";



interface Props {
    onSubmit: (values: OccupationalHealthcareEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnose[];
    set: (values: string[]) => void;
  }

const AddEntryForOcc = ({ onSubmit, onCancel, diagnoses, set }: Props) => {

    return (
      <Formik
        initialValues={{
            id: "",
            type: "OccupationalHealthcare",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes:[],
            employerName: "",
            sickLeave: {
                startDate: "",
                endDate: "",
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
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            return errors;
          }
        }
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
              label="Emplyername"
              placeholder="name"
              name="employerName"
              component={TextField}
            />

            <Field
              label="startDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />

            <Field
              label="endDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

  export default AddEntryForOcc;