
// this component is a controlled component which manages its own state
// it only receives parent function chooseWorkout() from props
// WorkoutSelector passes up a complete workoutObj in its chooseWorkout call
import { useState } from "react";
import { demoSavedWorkouts } from "../vars/workoutVars";

// custom hook which loads data from localStorage (if found), or demoSavedWorkouts if not found
import useLocalStorage from "../hooks/useLocalStorage";

import styles from "../styles/WorkoutSelector.module.css";

function WorkoutSelector(props) {
  const [ selectedWorkoutName, setSelectedWorkoutName ] = useState("");
  // VVV custom hook which loads savedWorkouts data from localStorage, if it exists...if not, loads from demoSavedWorkouts
  const [ savedWorkouts, setSavedWorkouts ] = useLocalStorage(demoSavedWorkouts);
  const [ haveChosen, setHaveChosen ] = useState(false);

  // handles changes in workout selection form
  function handleChange(evt){
    setSelectedWorkoutName(evt.target.value);
    if ( evt.target.value === "" ) {
      setHaveChosen(false);
    } else {
      setHaveChosen(true);
    }
  }

  // when we submit the form, call props.chooseWorkout, pass in selected workout obj
  function submitForm(evt){
    evt.preventDefault();
    savedWorkouts.forEach(elem => {
      // loop over savedWorkouts, find the one whose name matches selectedWorkoutName
      if (elem.workoutName === selectedWorkoutName) {
        props.chooseWorkout(elem); // pass the entire workout obj up to parent via props.chooseWorkout function
      }
    });
  }

  // populates list of available workouts to choose from
  function giveOptions(){
    // was encountering error where savedWorkouts was NOT an array (undefined?) at first, then it was
    if (Array.isArray(savedWorkouts)) {
      const myMap = savedWorkouts.map(elem => (
        <option key={elem.workoutName} value={elem.workoutName}>{elem.workoutName}</option>
      ));
      return myMap;
    } else {
      // included this option here to prevent error "savedWorkouts.map is not a function" when trying to map an undefined var
      return <option value="foobar">foobar</option>
    }
  };

  return (
    <>
      <h1 className={styles.title}>Select a Workout: </h1>
      <form onSubmit={submitForm}>
        <select className={styles.workoutInput} name="selectedWorkoutName" value={selectedWorkoutName} onChange={handleChange} required>
          <option value=""></option>
          { giveOptions() }
        </select>
        <button className={styles.greenIcon} type="submit" disabled={!haveChosen}><i className="fas fa-check-circle"></i></button>
      </form>
    </>
  );
};

export default WorkoutSelector;
