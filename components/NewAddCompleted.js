
// NEW version of AddCompletedWorkout, without default WorkoutSelector

import { useState, useEffect } from "react";
import styles from "../styles/NewAddCompleted.module.css";
// custom hook which loads data from localStorage (if found), or demoSavedWorkouts if not found
import useLocalStorage from "../hooks/useLocalStorage";
import { demoSavedWorkouts } from "../vars/workoutVars";
import dayjs from 'dayjs';

// import WorkoutSelector from "./WorkoutSelector";

export default function AddCompletedWorkout(props) {
  const [ nameValue, setNameValue ] = useState("");
  const [ dateValue, setDateValue ] = useState(props.propDate);
  const [ savedWorkouts, setSavedWorkouts ] = useLocalStorage(demoSavedWorkouts);
  const [ existing, setExisting ] = useState("");

  // check if other workouts exist at dateValue, and show warnings/alternate buttons if so
  useEffect(() => {
    // obtain storageKey and index from props.propDate
    let storageKey = dayjs(dateValue).format('MMMYYYY');
    let workoutIdx = dayjs(dateValue).format('D');
    // check if existing workouts appear on that date
    if (props.workoutHistory[storageKey] && props.workoutHistory[storageKey][workoutIdx]) {
      // if so, display warning message
      setExisting(props.workoutHistory[storageKey][workoutIdx]);
      // pass existing workouts to printExisting function, which logs them to the console
    } else {
      setExisting("");
    }
  }, [dateValue]); // <-- only rerun this effect if dateValue changes

  function handleChange(evt){
    if (evt.target.name === "dateValue") {
      setDateValue(evt.target.value);
    } else {
      setNameValue(evt.target.value);
    }
  };

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

  function handleSubmit(evt){
    evt.preventDefault();
    // call tracker.js function submitCompleted() with nameValue and dateValue
    props.submitCompleted(nameValue, dateValue, false);
    setNameValue("");
    setDateValue("");
  };

  function handleOverwrite(){
    props.submitCompleted(nameValue, dateValue, true);
    setNameValue("");
    setDateValue("");
  }

  function handleDelete() {
    props.deleteDayHistory(nameValue, dateValue);
    setNameValue("");
    setDateValue("");
  }


  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.centering}>
        <label htmlFor="nameValue" className={styles.bigLabel}>Workout Name:
          <select name="nameValue" value={nameValue} className={styles.myInput} onChange={handleChange} required>
            <option value=""></option>
            { giveOptions() }
          </select>
        </label>
        <label htmlFor="dateValue" className={styles.bigLabel}>Workout Date:
          <input type="date" name="dateValue" value={dateValue} className={styles.myInput} onChange={handleChange} required/>
        </label>
        <br/>

        { existing && (
          <div className={styles.warningDiv}>
            <h1><span className={styles.greenSpan}>Warning!</span> other workouts exist on this date:</h1>
            <span className={styles.bigGreen}>{existing}</span>
          </div>
        ) }

        <div className={styles.buttonBox}>
          { existing && <button className="butn" type="button" disabled={!nameValue} onClick={() => handleOverwrite()}>Overwrite All</button> }
          <button className="butn" type="submit" disabled={!nameValue}>{existing ? "Add To Existing" : "Submit"}</button>
          { existing && <button className="butn" type="button" onClick={() => handleDelete()}>Delete All</button> }
          <button className="butn" type="button" onClick={() => props.goBack()}>Cancel</button>
        </div>

      </form>
    </div>
  );
};

// { displayMenu && <div className={styles.centering}><WorkoutSelector chooseWorkout={chooseWorkout}/></div> }
// { !displayMenu &&
//   <div className={styles.rowOriented}>
//     <h1>Workout Name: <span className={styles.greenSpan}>{nameValue}</span></h1>
//     <button onClick={() => setDisplayMenu(true)} className={styles.iconButn}>
//       <i className="fas fa-edit"></i>
//     </button>
//   </div>
// }
