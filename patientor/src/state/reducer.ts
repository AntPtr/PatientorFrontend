import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |{
     type: "SINGLE_PATIENT";
     payload: Patient;
  };
    

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SINGLE_PATIENT":
      return{
        patients: {
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatietsList = (payload: Patient[]) : Action => {
  return({ type: "SET_PATIENT_LIST", payload: payload });
};

export const addPatient = (payload: Patient) : Action => {
  return({ type: "ADD_PATIENT", payload: payload });
};
export const singlePatietn = (payload: Patient) : Action  => {
  return({ type: "SINGLE_PATIENT", payload: payload });
};
