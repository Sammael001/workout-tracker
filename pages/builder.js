
// routine builder allows us to pick from a dropdown menu of exercises (including "rest"), and add them to a routine
// each exercise must be chosen with a duration (0-60 seconds)
// routines also require a name
// we should be able to re-order exercises (move their position up/down in the routine)
// once the routine is complete, we should allow saving to localStorage
// we should also be able to EDIT a saved routine, pulling it from localStorage to change durations or exercises
// final step is to make the stored routines selectable inside timer.js

// TO DO: get exercises within the routine to wrap into a 2nd column if we have more than 10
// ^^ restyle exercise entries into bordered tiles? as shown vv :
//       |  heel press
//     1 |  20 s.
//       |  [^][v][X]
// TO DO: allow re-ordering of added exercises
// TO DO: allow deletion of exercises
// TO DO: allow saving to localStorage
// TO DO: allow loading a stored routine which can be modified
// TO DO: decide where we will manage existing routines (modify + delete)


import styles from "../styles/Builder.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

let demoRoutine = {
  workoutName: "Legs Routine 1",
  exercises: [
    { name: "heel press", imgSrc: "my-img-src.png", duration: "30", id: "111" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "222" },
    { name: "calf raises", imgSrc: "my-img-src.png", duration: "30", id: "333" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "444" },
    { name: "fire hydrants", imgSrc: "my-img-src.png", duration: "30", id: "555" }
  ]
};

export default function Builder()  {
  const [ workoutName, setWorkoutName ] = useState(demoRoutine.workoutName);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ routine, setRoutine ] = useState(demoRoutine.exercises);
  const [ exercise, setExercise ] = useState("");
  const [ duration, setDuration ] = useState("");

  function handleChanges(evt){
    const {name} = evt.target;
    if (name === "exercise") setExercise(evt.target.value);
    if (name === "duration") setDuration(evt.target.value);
    if (name === "workoutName") setWorkoutName(evt.target.value);
  }

  function submitNameChange(evt){
    evt.preventDefault();
    setIsEditing(false);
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

  // add entire routine, plus its name, to localStorage
  function saveNewWorkout(){
    // compile pcsOfSt8 workoutName, routine, into obj that looks like so:
    // {
    //   workoutName: "Legs Routine 1",
    //   exercises: [
    //     { name: "heel press", imgSrc: "my-img-src.png", duration: "30", id: "111" },
    //     { ... },
    //     ...
    //   ]
    // }
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

          <ol>
            { routine.map(exercise => (
              <li key={exercise.id} className={styles.routineListItem}>
                {exercise.name} | {exercise.duration}s.
                <button className={styles.iconButn}><i className="fas fa-arrow-alt-circle-up"></i></button>
                <button className={styles.iconButn}><i className="fas fa-arrow-alt-circle-down"></i></button>
                <button className={styles.iconButn}><i className="fas fa-trash-alt"></i></button>
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
