
import { useState, useEffect } from "react";
import styles from "../styles/Tracker.module.css";

import dayjs from 'dayjs';


  // dayjs().daysInMonth()  -->  outputs # of days in current month, ex: 30
  // this VV outputs string of CURRENT date as shown: Wed Jun 09 2021
  // dayjs().format('ddd MMM DD YYYY')

// TO DO: inside submitCompleted, add the workout name and workout date*** to an array in localStorage under key workoutHistory
// *** how to store dates? as strings ("Fri Jun 18 2021") or as objects?
// let dateString = "Fri Jun 18 2021"
// let dateArr = dateString.split(' ');  --> output: ["Fri", "Jun", "18", "2021"]
// let dateObj = { dayOfWk: dateArr[0], month: dateArr[1], day: dateArr[2], year: dateArr[3] }
// ^^ OUTPUT: {dayOfWk: "Fri", month: "Jun", day: "18", year: "2021"}

// with the parsing above, stored workoutHistory can look like so:
// workoutHistory: [
//   { workoutName: "Demo Workout 1",
//     date: {
//       dayOfWk: "Fri",
//       month: "Jun",
//       day: "18",
//       year: "2021"
//     }
//   },
//   {...another workout obj here...},
// ]


import AddCompletedWorkout from "../components/AddCompletedWorkout";
import CurrentMonth from "../components/CurrentMonth";
import History from "../components/History";

export default function Tracker(){
  const [ showAdd, setShowAdd ] = useState(false);
  const [ showCurrent, setShowCurrent ] = useState(true);
  const [ showHistory, setShowHistory ] = useState(false);

  function displayAdd(){
    setShowAdd(true);
    setShowCurrent(false);
    setShowHistory(false);
  }
  function displayCurrent(){
    setShowAdd(false);
    setShowCurrent(true);
    setShowHistory(false);
  }
  function displayHistory(){
    setShowAdd(false);
    setShowCurrent(false);
    setShowHistory(true);
  }
  function submitCompleted(myName, myDate){
    console.log(`Completed workout named "${myName}" on date: ${myDate}`);
    // dates come from input form in this format: 2021-06-18
    let myParsedDate = dayjs(myDate).format('ddd MMM DD YYYY'); // parses date to: Fri Jun 18 2021
    console.log(myParsedDate);
    displayCurrent(); // after submitting a completed workout, redirect to display current month
    // TO DO: create completedWorkout obj with workoutName and date props
  }



  return (
    <div className={styles.mainCard}>
      { showAdd && <h1 className={styles.title}>Add Date</h1> }
      { showCurrent && <h1 className={styles.title}>Current Month</h1> }
      { showHistory && <h1 className={styles.title}>History</h1> }
      <div className={styles.buttonsDiv}>
        <button
          onClick={() => displayAdd()}
          className={`${styles.myButn} ${ showAdd ? styles.activeButn : styles.inactiveButn }`}
        >Add Date</button>
        <button
          onClick={() => displayCurrent()}
          className={`${styles.myButn} ${ showCurrent ? styles.activeButn : styles.inactiveButn }`}
        >Current Month</button>
        <button
          onClick={() => displayHistory()}
          className={`${styles.myButn} ${ showHistory ? styles.activeButn : styles.inactiveButn }`}
        >History
        </button>
      </div>
      <div className={styles.mainBox}>
        { showAdd && <AddCompletedWorkout submitCompleted={submitCompleted}/> }
        { showCurrent && <CurrentMonth /> }
        { showHistory && <History /> }
      </div>
    </div>
  );
};
