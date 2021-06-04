
// NOTE: each whole workout obj is a WORKOUT
// inside each WORKOUT we have a workoutName, and a ROUTINE (an array of EXERCISEs)

// TO DO: create workout images with specific names!
// each exercise should be tied to its own imgSrc, no need to manually select the imgSrc ...so an exercise named "calf raises" should have "calf-raises.png" available inside public/images/ by default


import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/Builder.module.css";
import { useState } from "react";

import { exampleWorkout } from "../vars/workoutVars";
import WorkoutSelector from "../components/WorkoutSelector";
import NewRoutine from "../components/NewRoutine";
import AddExercise from "../components/AddExercise";
import Warning from "../components/Warning";
import SaveMsg from "../components/SaveMsg";
import Delete from "../components/Delete";

export default function Builder()  {
  const [ workoutName, setWorkoutName ] = useState(exampleWorkout.workoutName);
  const [ routine, setRoutine ] = useState(exampleWorkout.routine); // a ROUTINE is the current array of exercises we have added
  const [ workoutID, setWorkoutID ] = useState(exampleWorkout.id);

  const [ isEditing, setIsEditing ] = useState(false); // "true" when workoutName is being edited, disables buttons

  const [ showMenu, setShowMenu ] = useState(false); // show or hide the workout selection menu, to load a stored workout
  const [ showDialog, setShowDialog ] = useState(false); // this var disables most buttons (while true) and displays a dialog box that may contain a warning, a save msg or a deletion msg
  const [ showWarning, setShowWarning ] = useState(false); // warning msg when about to overwrite an existing workout w/same name
  const [ showSave, setShowSave ] = useState(false); // save confirmation msg
  const [ showDelete, setShowDelete ] = useState(false); // deletion msg

  // called by <WorkoutSelector /> when we submit the routine selection form
  function chooseWorkout(selectedWorkoutObj){
    setShowMenu(false); // hide menu
    setWorkoutName(selectedWorkoutObj.workoutName);
    setRoutine(selectedWorkoutObj.routine);
    setWorkoutID(selectedWorkoutObj.id);
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
    let newID = uuidv4();
    if (savedArr.length === 0) { // check if savedArr from localStorage is empty
      savedArr = [{ workoutName: workoutName, id: newID, routine: [...routine] }]; // if so, add current workout obj into empty array
      window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));
      setWorkoutID(newID);
      setShowDialog(true); // show dialog box w/save confirmation
      setShowSave(true);
    } else { // localStorage arr is NOT empty...
      // ...so check for existing workouts with same workoutName
      let match = savedArr.some(elem => elem.workoutName.toLowerCase() === workoutName.toLowerCase());
      if (match) { // if duplicate name exists, show warning dialog
        setShowDialog(true); // show dialog box w/overwrite warning msg
        setShowWarning(true);
      } else { // ...else, no duplicates found
        // push a new obj (containing workoutName, new ID and routine arr) into savedWorkouts arr ..
        savedArr = [...savedArr, { workoutName: workoutName, id: newID, routine: [...routine] }];
        // ...and store savedWorkouts arr in localStorage under key "savedWorkouts"
        window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));
        setWorkoutID(newID);
        setShowDialog(true); // show dialog box w/save confirmation
        setShowSave(true);
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
        setWorkoutID(elem.id);
        return { workoutName: workoutName, id: elem.id, routine: [...routine] }
        // give a NEW ID when overwriting...so we can store workouts w/same name as "Demo Abs Routine", etc.
      } else {
        return elem;
      }
    });
    window.localStorage.setItem("savedWorkouts", JSON.stringify(savedMap)); // write our new map of savedWorkouts into localStorage
    setShowWarning(false); // hide warning, show save confirmation
    setShowSave(true);
  }

  function revealDeleteDialog(){
    setShowDialog(true); // show dialog box w/ delete message
    setShowDelete(true);
  }

  function deleteWorkout(idToDelete){
    console.log(`Deleting workout with ID ${idToDelete}`);
    let savedArr = JSON.parse(window.localStorage.getItem("savedWorkouts"));
    let filtered = savedArr.filter(elem => elem.id !== idToDelete);
    window.localStorage.setItem("savedWorkouts", JSON.stringify(filtered)); // write filtered copy of savedWorkouts into localStorage
    hideDialog();
  }

  function hideDialog(){ // hides dialog and all internal messages (save, delete, warning)
    setShowWarning(false);
    setShowSave(false);
    setShowDelete(false);
    setShowDialog(false);
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
                { showWarning && <Warning workoutName={workoutName} hideDialog={hideDialog} confirm={confirmOverwrite} /> }
                { showSave && <SaveMsg workoutName={workoutName} hideDialog={hideDialog} /> }
                { showDelete && (
                  <Delete
                    workoutName={workoutName}
                    workoutID={workoutID}
                    yesDelete={() => deleteWorkout(workoutID)}
                    cxlDelete={() => hideDialog()}
                  />
                )}
              </div>
            )}

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
              <button onClick={saveNewWorkout} className="butn" disabled={showDialog || isEditing }>SAVE WORKOUT</button>
              <button onClick={() => setShowMenu(true)} className="butn" disabled={showDialog || isEditing}>LOAD WORKOUT</button>
              <button onClick={revealDeleteDialog} className="butn" disabled={showDialog || isEditing}>DELETE WORKOUT</button>
            </div>
          </>
        )
      }
    </div>
  );
};


// { showDialog && (
//   <div className={styles.dialogBox}>
//     <h2><span className={styles.greenSpan}>Warning!</span> Workout with name <span className={styles.greenSpan}>{workoutName}</span> already exists in storage. <span className={styles.greenSpan}>Overwrite?</span></h2>
//     <button onClick={confirmOverwrite} className={styles.butn}>YES</button>
//     <button onClick={() => setShowDialog(false)} className={styles.butn}>NO</button>
//   </div>
//   )
// }
