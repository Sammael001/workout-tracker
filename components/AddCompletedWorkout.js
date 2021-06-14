
import { useState } from "react";
import styles from "../styles/AddCompletedWorkout.module.css";

import WorkoutSelector from "./WorkoutSelector";

export default function AddCompletedWorkout(props) {
  const [ nameValue, setNameValue ] = useState("");
  const [ dateValue, setDateValue ] = useState(props.propDate);
  const [ displayMenu, setDisplayMenu ] = useState(false); // will init as FALSE later

  function handleChange(evt){
    setDateValue(evt.target.value);
  };

  // chooseWorkout is a prop expected by our <WorkoutSelector/> component
  function chooseWorkout(workoutObj){
    setDisplayMenu(false);
    // chooseWorkout returns entire workoutObj, we just need to set the name as pcOfSt8 nameValue
    setNameValue(workoutObj.workoutName);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    // call tracker.js function submitCompleted() with nameValue and dateValue
    props.submitCompleted(nameValue, dateValue);
    setNameValue("");
    setDateValue("");
  }

  function handleGoBack(){
    console.log("Cancel was clicked!");
  }

  return (
    <div>
      { displayMenu && <div className={styles.centering}><WorkoutSelector chooseWorkout={chooseWorkout}/></div> }
      <form onSubmit={handleSubmit} className={styles.centering}>
        { !displayMenu &&
          <div className={styles.rowOriented}>
            <h1>Workout Name: <span className={styles.greenSpan}>{nameValue}</span></h1>
            <button onClick={() => setDisplayMenu(true)} className={styles.iconButn}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
        }
        <label htmlFor="dateValue" className={styles.bigLabel}>Workout Date:
          <input type="date" name="dateValue" value={dateValue} className={styles.myInput} onChange={handleChange} required/>
        </label>
        <br/>
        <button className="butn" type="submit" disabled={!nameValue}>Submit</button>
        <button className="butn" type="button" onClick={() => props.goBack()}>Cancel</button>
      </form>
    </div>
  );
};
