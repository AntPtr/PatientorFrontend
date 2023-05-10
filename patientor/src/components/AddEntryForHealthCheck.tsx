import { Field, Formik, Form } from "formik";
import { Diagnose, HealthCheckEntry, HealthCheckRating } from "../types";
import { TextField, DiagnosisSelection, SelectField } from "../AddPatientModal/FormField";
import { Grid, Button } from "@material-ui/core";

export type HealtCheckOp = {
    value: HealthCheckRating;
    label: string;
  };

const HealtCheckRatingSelect: HealtCheckOp[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  ];

interface Props {
    onSubmit: (values: HealthCheckEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnose[];
    set: (values: string[]) => void;
  }

const AddEntryForHealthCheck = ({ onSubmit, onCancel, diagnoses, set }: Props) => {

    return (
      <Formik
        initialValues={{
            id: "",
            type: "HealthCheck",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes:[],
            healthCheckRating: HealthCheckRating.Healthy     
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
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
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
              label="id"
              placeholder="id"
              name="id"
              component={TextField}
            />

           <SelectField label="HealtCheckRating" name="healthCheckRating" options={HealtCheckRatingSelect} />


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

  export default AddEntryForHealthCheck;