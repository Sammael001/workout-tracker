
import { useState } from "react";

import styles from "../styles/NewRoutine.module.css";

export default function NewRoutine({ workoutName, submitNameChange, routine, changeOrder, showDialog, isEditing, changeIsEditing, deleteEntry }) {
  const [ nameInput, setNameInput ] = useState(workoutName);

  function handleChange(evt){
    setNameInput(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    submitNameChange(nameInput);
  }

  function handleEditing(){
    changeIsEditing();
  }

  function handleChangeOrder(idx, direction){
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
    // setRoutine(routineCopy);
    changeOrder(routineCopy);
  }

  function handleDelete(idToDelete){
    // filter routine, call parent func deleteEntry and pass in mutated routine
    let filtered = routine.filter((elem) => elem.id !== idToDelete);
    deleteEntry(filtered); // parent will take care of calling setRoutine with mutated routine
  }

  return (
    <div className={styles.routineBox}>
      {
        isEditing
        ? (
            <form onSubmit={handleSubmit}>
              <input
                className={styles.workoutNameInput}
                type="text"
                name="nameInput"
                value={nameInput}
                onChange={handleChange}
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
              <button onClick={handleEditing} className={`${styles.iconButn} ${styles.bigIconButn}`} disabled={showDialog}>
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
              onClick={() => handleChangeOrder(idx, "up")}
              className={styles.iconButn}
              disabled={showDialog || isEditing}
            >
              <i className="fas fa-arrow-alt-circle-up"></i>
            </button>
            <button
              onClick={() => handleChangeOrder(idx, "down")}
              className={styles.iconButn}
              disabled={showDialog || isEditing}
            >
              <i className="fas fa-arrow-alt-circle-down"></i>
            </button>
            <button
              onClick={() => handleDelete(exercise.id)}
              className={styles.iconButn}
              disabled={showDialog || isEditing}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        )) }
      </ol>
    </div>
  );
};
