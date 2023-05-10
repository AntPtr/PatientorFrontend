import React from "react";
import axios from "axios";
import { Patient, Diagnose, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue, singlePatietn } from "../state";
import { apiBaseUrl } from "../constants";
import {useParams} from "react-router-dom";
import { useState } from "react";
import { Grid, Button, Box} from "@material-ui/core";
import AddEntryForm from "../components/AddEntryForm";
import AddEntryForHealthCheck from "../components/AddEntryForHealthCheck";
import AddEntryForOcc from "../components/AddEntryForOcc";


const PatientPage = () => {

    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [diagnoses, setDiagno] = useState<Diagnose[]> ();
    const [selected, setSelected] = useState<string[]>();
    const [types, setType] = useState("");

    const setForm = (type: string ) => {
      if(diagnoses){
          if(type === "HealthCheck"){
            return(
              <AddEntryForHealthCheck onSubmit={submitHoealthCheck} onCancel={() => {setType("");}} set={setSelected} diagnoses={diagnoses}/>
            );
          }
          if(type === "Hospital"){
            return(
              <AddEntryForm onSubmit={submitHospital} onCancel={() => {setType("");}} set={setSelected} diagnoses={diagnoses}/>
            );
          }
          if(type === "OccupationalHealthcare"){
            return(
              <AddEntryForOcc onSubmit={submitOccupational} onCancel={() => {setType("");}} set={setSelected} diagnoses={diagnoses}/>
            );
          }
        }
      };

    const submitHospital = async (entry: HospitalEntry) => {
      console.log("subm");
      try {
        if(id){
        entry.diagnosisCodes = selected;
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          entry
        );
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
        }
      } catch (error: unknown) {
        if(axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
        }
      }
    };

    const submitHoealthCheck = async (entry: HealthCheckEntry) => {
      console.log("subm");
      try {
        if(id){
        entry.diagnosisCodes = selected;
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          entry
        );
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
        }
      } catch (error: unknown) {
        if(axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
        }
      }
    };

    const submitOccupational = async (entry: OccupationalHealthcareEntry) => {
      console.log("subm");
      try {
        if(id){
        entry.diagnosisCodes = selected;
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          entry
        );
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
        }
      } catch (error: unknown) {
        if(axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
        }
      }
    };
    
    
    React.useEffect(() => {
  
      const fetchPatientList = async () => {
        try {
          if(id){
            const { data: patientListFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(singlePatietn(patientListFromApi));
          }
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
      const fetchDiagnoese = async () => {
        try{
          const { data: diagnosesApi } = await axios.get<Diagnose[]>(
            `${apiBaseUrl}/diagnoses`
          );
          setDiagno(diagnosesApi);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchDiagnoese();
        
    }, []);

    return (
      <div>
      {Object.values(patients).map((patient: Patient) => (
        <li key={patient.id}>
          <h1>{patient.name} {patient.gender}</h1>
          <p>{patient.ssn}</p>
          <p>{patient.occupation}</p>
        </li>
      ))}
      <h2>Entries</h2>
      {Object.values(patients).map((patient: Patient) => {
        if (patient.entries){
          return(
            patient.entries.map(e => (
              <p key={e.id}>{e.date} {e.description}</p>
            ))
          );
        }
        else{
          return(null);
        }
        })}
        {Object.values(patients).map((patient: Patient) => {
        if (patient.entries){
          return(
          patient.entries.map(e => {
            if(e.diagnosisCodes){
              const codes:  { [id: string]: string }  = {};
              if(diagnoses){
                e.diagnosisCodes.forEach( c => {
                  diagnoses.forEach(d => {
                    d.code === c ? codes[c] = d.name: null;
                  });
                });
              }
             return(e.diagnosisCodes.map(d => (
              <li key={d}>{d} {codes[d]}</li>
             )));
            }
          })
          );
        }
        else{
          return(null);
        }
        })}
        <Grid>
              <Box   display="flex" justifyContent="space-evenly"   alignItems="center">
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={() => { setType("Hospital");}}
                >
                  HospitalEntry
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{margin: '0 auto', display: "flex"}}
                  type="button"
                  onClick={() => {  setType("HealthCheck");}}
                >
                  HealthCheck
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{margin: "auto", display: "flex", float:"right"}}
                  type="button"
                  onClick={() => {  setType("OccupationalHealthcare");}}
                >
                  OccupationalHealthcare
                </Button>
              </Box>
            </Grid>
            { setForm(types) }
      </div>
    );
  };
export default PatientPage;