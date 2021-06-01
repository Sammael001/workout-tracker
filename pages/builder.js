
// routine builder allows us to pick from a dropdown menu of exercises (including "rest"), and add them to a routine
// each exercise must be chosen with a duration (0-60 seconds)
// routines also require a name
// we should be able to re-order exercises (move their position up/down in the routine)
// once the routine is complete, we should allow saving to localStorage
// we should also be able to EDIT a saved routine, pulling it from localStorage to change durations or exercises
// final step is to make the stored routines selectable inside timer.js

// TO DO: allow saving to localStorage
// TO DO: allow loading a stored routine which can be modified
// TO DO: decide where we will manage existing routines (modify + delete)


import styles from "../styles/Builder.module.css";
import { useState } from "react";
// import useLocalStorageState from "../hooks/useLocalStorageState";

import { v4 as uuidv4 } from 'uuid';

let demoRoutine = {
  workoutName: "Legs Routine 1",
  exercises: [
    { name: "heel press", imgSrc: "my-img-src.png", duration: "30", id: "111" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "222" },
    { name: "calf raises", imgSrc: "my-img-src.png", duration: "30", id: "333" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "444" },
    { name: "fire hydrants", imgSrc: "my-img-src.png", duration: "30", id: "555" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "666" },
    { name: "lunges", imgSrc: "my-img-src.png", duration: "30", id: "777" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "888" },
    { name: "crunches", imgSrc: "my-img-src.png", duration: "30", id: "999" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "000" },
  ]
};

export default function Builder()  {
  // const savedWorkouts = JSON.parse(window.localStorage.getItem("savedWorkouts"));
  const [ workoutName, setWorkoutName ] = useState(demoRoutine.workoutName);
  const [ routine, setRoutine ] = useState(demoRoutine.exercises);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ exercise, setExercise ] = useState("");
  const [ duration, setDuration ] = useState("");

  function handleChanges(evt){
    const {name} = evt.target;
    if (name === "exercise") setExercise(evt.target.value);
    if (name === "duration") setDuration(evt.target.value);
    if (name === "workoutName") setWorkoutName(evt.target.value);
  }

  // allows name of routine to be changed
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
    setRoutine([...routine, newExercise]);
    setExercise(""); // clear out exercise and duration from input forms
    setDuration("");
  }

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

  // add entire routine, plus its name, to an array in localStorage under key "savedWorkouts"
  // !!!! NOTE: workouts with same workoutName will NOT overwrite each other, must check for them!
  function saveNewWorkout(){
    // pull savedWorkouts from localStorage -- OR, if key of "savedWorkouts" does not exist in local, init savedWorkouts as empty obj
    let savedArr = JSON.parse(window.localStorage.getItem("savedWorkouts")) || [];
    // push a new obj into savedWorkouts arr (containing workoutName and routine arr)
    savedArr = [...savedArr, { workoutName: workoutName, routine: [...routine] }];
    // store savedWorkouts arr in localStorage under key "savedWorkouts"
    window.localStorage.setItem("savedWorkouts", JSON.stringify(savedArr));

  }

  return (
    <div className={styles.mainCard}>
      <h1 className={styles.title}>Routine Builder</h1>

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
                    className={styles.routineTitleInput}
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
                <h1 className={styles.routineName}>
                  {workoutName}
                  <button onClick={() => setIsEditing(true)} className={`${styles.iconButn} ${styles.bigIconButn}`}>
                    <i className="fas fa-edit"></i>
                  </button>
                </h1>
              )
          }

          <ol className={styles.routineList}>
            { routine.map((exercise, idx) => (
              <li key={exercise.id} className={styles.routineListItem}>
                {exercise.name} | {exercise.duration}s.
                <button onClick={() => swapEntries(idx, "up")} className={styles.iconButn}><i className="fas fa-arrow-alt-circle-up"></i></button>
                <button onClick={() => swapEntries(idx, "down")} className={styles.iconButn}><i className="fas fa-arrow-alt-circle-down"></i></button>
                <button onClick={() => deleteEntry(exercise.id)} className={styles.iconButn}><i className="fas fa-trash-alt"></i></button>
              </li>
            )) }
          </ol>
        </div>

      </div>

      <div className={styles.saveAndLoadButns}>
        <button onClick={saveNewWorkout} className={styles.butn}>SAVE THIS ROUTINE</button>
        <button className={styles.butn}>LOAD SAVED ROUTINE</button>
      </div>

    </div>
  );
};
