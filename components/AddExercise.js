
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/AddExercise.module.css";
import { exerciseOptions } from "../vars/workoutVars";

export default function AddExercise({ submitNewEntry, workoutName, showDialog, isEditing }) {
  const [ exercise, setExercise ] = useState("");
  const [ duration, setDuration ] = useState("");

  function handleChanges(evt){
    const {name} = evt.target;
    if (name === "exercise") setExercise(evt.target.value);
    if (name === "duration") setDuration(evt.target.value);
  }

  // function handleSubmit(evt){
  //   evt.preventDefault();
  //   let src = exercise.replace(/\s+/g, '-').toLowerCase(); // replace spaces with dashes and convert to lowercase
  //   let newExercise = { name: exercise.toLowerCase(), duration: duration, imgSrc: `${src}.png`, id: uuidv4() };
  //   // call parent function submitNewEntry, pass in newExercise obj
  //   submitNewEntry(newExercise);
  //   setExercise(""); // clear out exercise and duration from input forms
  //   setDuration("");
  // }

  function handleSubmit(evt){
    evt.preventDefault();
    // let src = exercise.replace(/\s+/g, '-').toLowerCase(); // replace spaces with dashes and convert to lowercase
    let newSrc;
    // build src by checking if src string has l) or r) at the end... if so, remove last 3 chars and replace with "left" or "right"
    if (exercise[exercise.length-1] === ")" && exercise[exercise.length-2] === "L") {
      newSrc = exercise.slice(0, exercise.length - 3).concat("left");
    } else if (exercise[exercise.length-1] === ")" && exercise[exercise.length-2] === "R") {
      newSrc = exercise.slice(0, exercise.length - 3).concat("right");
    } else {
      newSrc = exercise;
    }
    let newExercise = { name: exercise, duration: duration, imgSrc: `${newSrc}.gif`, id: uuidv4() };
    // call parent function submitNewEntry, pass in newExercise obj
    // console.log(newExercise);
    submitNewEntry(newExercise);
    setExercise(""); // clear out exercise and duration from input forms
    setDuration("");
  }

  function giveOptions() {
    let exOptions = exerciseOptions.map(elem => {
      return <option key={uuidv4()} value={elem}>{elem}</option>
    });
    return exOptions;
  }

  return (
    <div className={styles.addNewBox}>

      <h3>Add new exercise to <span className={styles.greenSpan}>{workoutName}</span>:</h3>
      <form onSubmit={handleSubmit} className={styles.addNewForm}>

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
            { giveOptions() }
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
  );
};

// <option value="Rest">Rest</option>
// <option value="Flutter Kicks">Flutter Kicks</option>
// <option value="Squats">Squats</option>
// <option value="Lunges">Lunges</option>
// <option value="Plank">Plank</option>
// <option value="Standing Leg Lifts">Standing Leg Lifts</option>
// <option value="Reverse Crunches">Reverse Crunches</option>
// <option value="Russian Twists">Russian Twists</option>
