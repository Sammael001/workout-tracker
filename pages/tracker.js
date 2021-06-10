
import { useState, useEffect } from "react";
import styles from "../styles/Tracker.module.css";
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';


// dayjs().daysInMonth()  -->  outputs # of days in current month, ex: 30
// this VV outputs string of CURRENT date as shown: Wed Jun 09 2021
// dayjs().format('ddd MMM DD YYYY')
// dayjs(myDate).format('MMMYYYY')

// TO DO: inside submitCompleted, add the workout into localStorage under key workoutHistory
// workoutHistory: {
//   May2021: [ "", "", "", ....32 elements in array b/c May2021 has 31 days... ],
//   Jun2021: [ "", "", "", "Abs Workout", "", "", "", "", "", "", "", "", "Legs Workout", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]
// }
//  We have 31 elements in Jun2021 array, b/c Jun2021 has 30 days
// "Abs Workout" is at idx 4 b/c workout was completed Jun-04-2021 ... "Legs Workout" at idx 13 b/c it was completed Jun-13-2021

// TO DO: when adding MULTIPLE workouts to SAME day, concat with "|" like so: "Legs Workout|Arms Workout"
// TO DO: this means we must forbid "|" character from being entered during workoutName entry inside NewRoutine.js

const dummyHistory =  {
  May2021: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
  Jun2021: [ "", "", "", "Abs Workout 2", "", "", "", "", "", "", "", "", "Legs Workout 3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]
};

import AddCompletedWorkout from "../components/AddCompletedWorkout";
import CurrentMonth from "../components/CurrentMonth";
import History from "../components/History";

export default function Tracker(){
  const [ showAdd, setShowAdd ] = useState(false);
  const [ showCurrent, setShowCurrent ] = useState(true);
  const [ showHistory, setShowHistory ] = useState(false);
  const [ workoutHistory, setWorkoutHistory ] = useState({});

  useEffect(() => {
    console.log("running useEffect to load workoutHistory");
    let myWorkoutHistory = JSON.parse(window.localStorage.getItem("workoutHistory")) || dummyHistory;
    setWorkoutHistory(myWorkoutHistory); // set pcOfSt8
  }, [ showAdd, showCurrent, showHistory ]);
  // showAdd, showCurrent, showHistory in dependency array means we only reload workoutHistory when tracker submenu changes

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
    console.log(`Completed workout named "${myName}" on date: ${myDate}`); // dates come from input form in this format: 2021-06-18
    let daysInMonth = dayjs(myDate).daysInMonth();
    let storageKey = dayjs(myDate).format('MMMYYYY');
    let workoutDay = dayjs(myDate).format('D');
    console.log(`storageKey: ${storageKey}, workoutDay: ${workoutDay}`);

    // IMPORTANT:  this function half works...it pushes new elements into arrays when the storageKey is ALREADY a prop in currHist, but won't add new storageKeys
    setWorkoutHistory(currHist => {
      if (!currHist[storageKey]) { // currHist[storageKey] is falsy if key of storageKey is not found (undefined) in workoutHistory
        let blankArr = new Array(daysInMonth).fill(""); // init new empty array that is daysInMonth long
        blankArr[workoutDay] = myName; // add name of workout into blank array, at idx of workoutDay
        console.log(blankArr);
        return { ...currHist, [storageKey]: blankArr }; // must return an obj that will replace the obj in workoutHistory
      } else { // storageKey exists in currHist, so copy the array at [storageKey], add in the new workout element, and push back in
        let blankArr = [...currHist[storageKey]];
        blankArr[workoutDay] = myName;
        return { ...currHist, [storageKey]: blankArr }; // must return an obj that will replace the obj in workoutHistory
      }
    });

    // TO DO: when adding MULTIPLE workouts to SAME day, concat with "|" like so: "Legs Workout|Arms Workout"
    // TO DO: this means we must forbid "|" character from being entered during workoutName entry inside NewRoutine.js
    displayCurrent(); // after submitting a completed workout, redirect to display current month
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
