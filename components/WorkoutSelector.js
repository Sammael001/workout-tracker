
// this component needs to be a controlled component which manages its own state
// receive list of workoutChoices, parent function chooseWorkout() in props
import { useState } from "react";

import styles from "../styles/WorkoutSelector.module.css";

function WorkoutSelector(props) {
  const [ selectedWorkoutName, setSelectedWorkoutName ] = useState("");
  // handles changes in workout selection form
  function handleChange(evt){
    setSelectedWorkoutName(evt.target.value);
  }
  // when we submit the form, call props.chooseWorkout, pass in selectedWorkoutName
  function submitForm(evt){
    evt.preventDefault();
    props.chooseWorkout(selectedWorkoutName);
    // clear out selectedWorkoutName?
  }

  return (
    <>
      <h1 className={styles.title}>Select a Workout: </h1>
      <form onSubmit={submitForm}>
        <select className={styles.workoutInput} name="selectedWorkoutName" value={selectedWorkoutName} onChange={handleChange} required>
          <option value=""></option>
          { props.workoutChoices }
        </select>
        <button className={styles.butn} type="submit">OK</button>
      </form>
    </>
  );
};

export default WorkoutSelector;
