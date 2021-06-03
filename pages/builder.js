
// NOTE: each whole workout obj is a WORKOUT
// inside each WORKOUT we have a workoutName, and a ROUTINE (an array of EXERCISEs)

// TO DO: make dialog box its own component, which receives 2 props: a message, and a confirm function
// TO DO: allow dialog box to pop up with "saved workout ${workoutName}" message OR the overwrite-warning message

// TO DO: create workout images with specific names!
// each exercise should be tied to its own imgSrc, no need to manually select the imgSrc ...so an exercise named "calf raises" should have "calf-raises.png" available inside public/images/ by default

// TO DO: disable workout selection button (inside timer.js) while stopwatchOn

// TO DO: allow stored workouts to be deleted

import styles from "../styles/Builder.module.css";
import { useState } from "react";
//import { v4 as uuidv4 } from 'uuid';
import { exampleWorkout } from "../vars/workoutVars";
import WorkoutSelector from "../components/WorkoutSelector";
import NewRoutine from "../components/NewRoutine";
import AddExercise from "../components/AddExercise";

export default function Builder()  {
  const [ workoutName, setWorkoutName ] = useState(exampleWorkout.workoutName);
  const [ routine, setRoutine ] = useState(exampleWorkout.routine); // a ROUTINE is the current array of exercises we have added

  const [ isEditing, setIsEditing ] = useState(false); // "true" when workoutName is being edited, disables buttons

  const [ showMenu, setShowMenu ] = useState(false); // show or hide the workout selection menu, to load a stored workout
  const [ showDialog, setShowDialog ] = useState(false); // this var disables most buttons (while true) and displays a pop-up warning about overwriting an existing workout

  // called by <WorkoutSelector /> when we submit the routine selection form
  function chooseWorkout(selectedWorkoutObj){
    setShowMenu(false); // hide menu
    setWorkoutName(selectedWorkoutObj.workoutName);
    setRoutine(selectedWorkoutObj.routine);
  }

  // called by <NewRoutine />, disables other buttons while workoutName is being edited
  function changeIsEditing(){
    setIsEditing(true);
  }

  // called by <NewRoutine />, allows name of workout to be changed
  function submitNameChange(newName){
    // evt.preventDefault();
    setIsEditing(false);
    setWorkoutName(newName);
  }

  // called by <AddExercise/> component, which passes in newExercise obj
  // adds new exercise (with its name, imgSrc, duration and ID) to existing routine
  function submitNewEntry(newExercise){
    setRoutine([...routine, newExercise]); // add new exercise to current routine array
  }

  // called by <NewRoutine />, sets routine with filtered (1 elem removed) version of routine array
  function deleteEntry(filteredRoutine){
    // let filtered = routine.filter((elem) => elem.id !== idToDelete);
    setRoutine(filteredRoutine);
  }

  // called by <NewRoutine />, receives copy of routine with altered exercise order
  function changeOrder(newRoutineOrder){
    setRoutine(newRoutineOrder);
  }

  // add entire workout (routine arr + workoutName) to an array in localStorage under key "savedWorkouts"
  function saveNewWorkout(){
    // pull savedWorkouts from localStorage, OR init savedArr to empty arr if none stored
    let savedArr = JSON.parse(window.localStorage.getItem("savedWorkouts")) || [];
    if (savedArr.length === 0) { // check if savedArr from localStorage is empty
      savedArr = [{ workoutName: workoutName, routine: [...routine] }]; // if so, add current workout obj into empty array
      window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));
    } else { // localStorage arr is NOT empty...
      // ...so check for existing workouts with same workoutName
      let match = savedArr.some(elem => elem.workoutName.toLowerCase() === workoutName.toLowerCase());
      if (match) { // if duplicate name exists, show warning dialog
        setShowDialog(true);
      } else { // ...else, no duplicates found
        // push a new obj (containing workoutName and routine arr) into savedWorkouts arr ..
        savedArr = [...savedArr, { workoutName: workoutName, routine: [...routine] }];
        // ...and store savedWorkouts arr in localStorage under key "savedWorkouts"
        window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));
      }
    }
  }

  function confirmOverwrite(){
    // load saved workouts from localStorage
    let savedArr = JSON.parse(window.localStorage.getItem("savedWorkouts"));
    // create a map from savedWorkouts array
    let savedMap = savedArr.map(elem => {
      if (elem.workoutName.toLowerCase() === workoutName.toLowerCase()) {
        // if a workout obj has a (lowercased) name that matches (lowercased) workoutName, overwrite it
        return { workoutName: workoutName, routine: [...routine] }
      } else {
        return elem;
      }
    });
    window.localStorage.setItem("savedWorkouts", JSON.stringify(savedMap)); // write our new map of savedWorkouts into localStorage
    setShowDialog(false); // hide dialog box
  }

  return (
    <div className={styles.mainCard}>
      { showMenu
        ? <WorkoutSelector chooseWorkout={chooseWorkout} />
        : (
          <>
            <h1 className={styles.title}>Routine Builder</h1>
            { showDialog && (
              <div className={styles.dialogBox}>
                <h2>
                  <span className={styles.greenSpan}>Warning!</span> Workout with name <span className={styles.greenSpan}>{workoutName}</span> already exists in storage. <span className={styles.greenSpan}>Overwrite?</span></h2>
                <button onClick={confirmOverwrite} className={styles.butn}>YES</button>
                <button onClick={() => setShowDialog(false)} className={styles.butn}>NO</button>
              </div>
              )
            }

            <div className={styles.mainBox}>

              <AddExercise
                submitNewEntry={submitNewEntry}
                workoutName={workoutName}
                showDialog={showDialog}
                isEditing={isEditing}
              />

              <NewRoutine
                workoutName={workoutName}
                submitNameChange={submitNameChange}
                routine={routine}
                changeOrder={changeOrder}
                showDialog={showDialog}
                isEditing={isEditing}
                changeIsEditing={changeIsEditing}
                deleteEntry={deleteEntry}
              />

            </div>

            <div className={styles.saveAndLoadButns}>
              <button onClick={saveNewWorkout} className={styles.butn} disabled={showDialog || isEditing}>SAVE WORKOUT</button>
              <button onClick={() => setShowMenu(true)} className={styles.butn} disabled={showDialog || isEditing}>LOAD WORKOUT</button>
              <button className={styles.butn} disabled={showDialog || isEditing}>DELETE WORKOUT</button>
            </div>
          </>
        )
      }
    </div>
  );
};
