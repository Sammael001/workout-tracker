
// NOTE: each whole workout obj is a WORKOUT
// inside each WORKOUT we have a workoutName, and a ROUTINE (an array of EXERCISEs)

// TO DO: make dialog box its own component, which receives 2 props: a message, and a confirm function
// TO DO: allow dialog box to pop up with "saved workout ${workoutName}" message OR the overwrite-warning message

// TO DO: allow loading exercises from a stored workout
// -- use WorkoutSelector component!
// WorkoutSelector will call parent func props.chooseWorkout() and pass in selectedWorkoutName
// MAYBE WorkoutSelector should take care of loading savedWorkoutData from localStorage or from the workoutVars.js
    // it can call custom hook useLocalStorage for this
// workoutSelector can then return entire selectedWorkout OBJECT to either timer.js or builder.js
// ^^ this is more direct than having the parent pages load savedWorkoutData and hand it down to WorkoutSelector
// timer.js does not need to write any data to localStorage...and builder.js can reload savedWorkoutData from localStorage when it needs to write 

// -- load data from localStorage, call setRoutine and setWorkoutName with chosen workout
// -- can overwrite existing workout (if workout name unchanged) or add new (if workout name changed)
// TO DO: allow stored workouts to be deleted


import styles from "../styles/Builder.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { exampleWorkout } from "../vars/workoutVars";

export default function Builder()  {
  const [ workoutName, setWorkoutName ] = useState(exampleWorkout.workoutName);
  // a ROUTINE is the current array of exercises we have added
  const [ routine, setRoutine ] = useState(exampleWorkout.routine);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ exercise, setExercise ] = useState("");
  const [ duration, setDuration ] = useState("");

  const [ showDialog, setShowDialog ] = useState(false); // will init as FALSE after testing
  // this var disables most buttons (while true) and displays a pop-up warning about overwriting an existing workout

  function handleChanges(evt){
    const {name} = evt.target;
    if (name === "exercise") setExercise(evt.target.value);
    if (name === "duration") setDuration(evt.target.value);
    if (name === "workoutName") setWorkoutName(evt.target.value);
  }

  // allows name of workout to be changed
  function submitNameChange(evt){
    evt.preventDefault();
    setIsEditing(false);
    // submitNameChange receives the whole workoutName form, but target[0] is the name input field
    setWorkoutName(evt.target[0].value);
  }

  // add new exercise (with its name, imgSrc, duration and ID) to existing routine
  function submitNewEntry(evt){
    evt.preventDefault();
    // TO DO: each exercise should be tied to its own imgSrc, no need to manually select the imgSrc ...so an exercise named "calf raises" should have "calf-raises.png" available inside public/images/ by default
    let src = exercise.replace(/\s+/g, '-').toLowerCase(); // replace spaces with dashes and convert to lowercase
    let newExercise = { name: exercise.toLowerCase(), duration: duration, imgSrc: `${src}.png`, id: uuidv4() };
    setRoutine([...routine, newExercise]); // add new exercise to current routine array
    setExercise(""); // clear out exercise and duration from input forms
    setDuration("");
  }

  // remove an exercise from the current routine array
  function deleteEntry(idToDelete){
    let filtered = routine.filter((elem) => elem.id !== idToDelete);
    setRoutine(filtered);
  }

  // move exercises up/down in routine order
  function swapEntries(idx, direction){
    // will rcv idx of item to be swapped and the direction: "up" or "down"
    // swap syntax: [ myArr[1], myArr[2] ] = [ myArr[2], myArr[1] ];
    let routineCopy = [...routine];
    // check for edge cases -- swapping down when we're at the last idx, or up when we're at the 0th idx
    if (idx === 0 && direction === "up") {
      // shift first element from start, push onto end of array
      let removed = routineCopy.shift();
      routineCopy.push(removed);
    } else if (idx === routine.length-1 && direction === "down") {
      // pop last element from end, unshift onto start of array
      let removed = routineCopy.pop();
      routineCopy.unshift(removed);
    } else if (direction === "up") {
      [ routineCopy[idx], routineCopy[idx-1] ] = [ routineCopy[idx-1], routineCopy[idx] ];
    } else { // swap going down
      [ routineCopy[idx], routineCopy[idx+1] ] = [ routineCopy[idx+1], routineCopy[idx] ];
    };
    setRoutine(routineCopy);
  }

  // add entire workout (routine arr + workoutName) to an array in localStorage under key "savedWorkouts"
  function saveNewWorkout(){
    // pull savedWorkouts from localStorage, OR init savedArr to empty arr if none stored
    let savedArr = JSON.parse(window.localStorage.getItem("savedWorkouts")) || [];
    // let currentName = workoutName.toLowerCase();
    if (savedArr.length === 0) { // check if savedArr from localStorage is empty
      savedArr = [{ workoutName: workoutName, routine: [...routine] }];
      window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));
    } else { // localStorage arr is NOT empty...
      // ...so check for existing workouts with same workoutName
      let match = savedArr.some(elem => elem.workoutName.toLowerCase() === workoutName.toLowerCase());
      // if duplicate name exists, show warning dialog
      if (match) {
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
    // find one with name that matches workoutName, and overwrite it
    let savedMap = savedArr.map(elem => {
      if (elem.workoutName.toLowerCase() === workoutName.toLowerCase()) {
        return { workoutName: workoutName, routine: [...routine] }
      } else {
        return elem;
      }
    });
    // save modified copy of workouts into localStorage
    window.localStorage.setItem("savedWorkouts", JSON.stringify(savedMap));
    setShowDialog(false); // hide dialog box
  }

  return (
    <div className={styles.mainCard}>
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

        <div className={styles.addNewBox}>

          <h3>Add new exercise to <span className={styles.greenSpan}>{workoutName}</span>:</h3>
          <form onSubmit={submitNewEntry} className={styles.addNewForm}>

            <label className={styles.myLabel}>
              Exercise:
              <select
                className={styles.addNewInputs}
                name="exercise"
                value={exercise}
                onChange={handleChanges}
                required
              >
                <option value=""></option>
                <option value="Rest">Rest</option>
                <option value="Flutter Kicks">Flutter Kicks</option>
                <option value="Squats">Squats</option>
                <option value="Lunges">Lunges</option>
                <option value="Plank">Plank</option>
                <option value="Standing Leg Lifts">Standing Leg Lifts</option>
                <option value="Reverse Crunches">Reverse Crunches</option>
                <option value="Russian Twists">Russian Twists</option>
              </select>
            </label>
            <br/>

            <label className={styles.myLabel}>
              Duration:
              <input
                className={styles.addNewInputs}
                type="number"
                name="duration"
                value={duration}
                min="1"
                max="60"
                onChange={handleChanges}
                required
              />
              s
            </label>
            <br/>

            <button
              type="submit"
              className={styles.addButn}
              disabled={showDialog || isEditing}
            > Add!{' '}
              <i className="fas fa-plus-square"></i>
            </button>
          </form>

        </div>

        <div className={styles.routineBox}>
          {
            isEditing
            ? (
                <form onSubmit={submitNameChange}>
                  <input
                    className={styles.workoutNameInput}
                    type="text"
                    name="workoutName"
                    value={workoutName}
                    onChange={handleChanges}
                    autoFocus
                    required
                  />
                  <button type="submit" className={`${styles.iconButn} ${styles.bigIconButn}`}>
                    <i className="fas fa-check-square"></i>
                  </button>
                </form>
              )
            : (
                <h1 className={styles.workoutName}>
                  {workoutName}
                  <button onClick={() => setIsEditing(true)} className={`${styles.iconButn} ${styles.bigIconButn}`} disabled={showDialog}>
                    <i className="fas fa-edit"></i>
                  </button>
                </h1>
              )
          }

          <ol className={styles.routineList}>
            { routine.map((exercise, idx) => (
              <li key={exercise.id} className={styles.routineListItem}>
                {exercise.name} | {exercise.duration}s.
                <button
                  onClick={() => swapEntries(idx, "up")}
                  className={styles.iconButn}
                  disabled={showDialog || isEditing}
                >
                  <i className="fas fa-arrow-alt-circle-up"></i>
                </button>
                <button
                  onClick={() => swapEntries(idx, "down")}
                  className={styles.iconButn}
                  disabled={showDialog || isEditing}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i>
                </button>
                <button
                  onClick={() => deleteEntry(exercise.id)}
                  className={styles.iconButn}
                  disabled={showDialog || isEditing}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            )) }
          </ol>
        </div>

      </div>

      <div className={styles.saveAndLoadButns}>
        <button onClick={saveNewWorkout} className={styles.butn} disabled={showDialog || isEditing}>SAVE WORKOUT</button>
        <button className={styles.butn} disabled={showDialog || isEditing}>LOAD WORKOUT</button>
        <button className={styles.butn} disabled={showDialog || isEditing}>DELETE WORKOUT</button>
      </div>

    </div>
  );
};
