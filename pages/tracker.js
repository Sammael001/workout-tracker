
import { useState, useEffect } from "react";
import styles from "../styles/Tracker.module.css";
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

// TO DO: decide how to manage workout deletion
// TO DO: decide how to manage multiple workouts on same day (or whether to allow this at all)
// TO DO: shift position of days and workout names on calendar
// TO DO: shorten workout names (when displayed on calendar) if too long


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

import NewAddCompleted from "../components/NewAddCompleted";
// import AddCompletedWorkout from "../components/AddCompletedWorkout";
import CurrentMonth from "../components/CurrentMonth";
import History from "../components/History";

export default function Tracker(){
  const [ showAdd, setShowAdd ] = useState(false);
  const [ showCurrent, setShowCurrent ] = useState(true);
  const [ showHistory, setShowHistory ] = useState(false);
  const [ workoutHistory, setWorkoutHistory ] = useState({});
  const [ propDate, setPropDate ] = useState( dayjs().format('YYYY-MM-DD') ); // this pcOfSt8 gives default values to date picker

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

  // this function is called from within CurrentMonth by clicking on a calendar cell
  function goToAddDate(dateString){
    setPropDate(dateString); // receive a date string (ex: 2021-08-05) and call setPropDate with the string
    displayAdd(); // then call displayAdd()
    // this results in the AddCompletedWorkout component showing, with the clicked date autofilled
  }

  // called by NewAddCompleted, can add new workouts (to empty or already populated days) or overwrite workouts on populated days
  function submitCompleted(myName, myDate, overwrite){
    let daysInMonth = dayjs(myDate).daysInMonth();
    let storageKey = dayjs(myDate).format('MMMYYYY');
    let workoutDay = dayjs(myDate).format('D');
    let newHistObj = {}; // object to hold obj from workoutHistory, for mutating + writing back into workoutHistory and localStorage

    setWorkoutHistory(currHist => {
      if (!currHist[storageKey]) { // currHist[storageKey] is falsy if key of storageKey is not found (undefined) in workoutHistory
        let monthArr = new Array(daysInMonth).fill(""); // init new empty array that is daysInMonth long
        monthArr[workoutDay] = `•${myName}`; // add name of workout into month array, at idx of workoutDay
        newHistObj = { ...currHist, [storageKey]: monthArr };
        // moved localStorage.setItem into here, bcuz calling localStorage.setItem below setWorkoutHistory() could accidentally set the localStorage to an empty object
        window.localStorage.setItem("workoutHistory", JSON.stringify(newHistObj));
        return newHistObj; // must return an obj that will replace the obj in workoutHistory
      } else { // if we arrive here, storageKey exists in currHist
        let monthArr = [...currHist[storageKey]]; // copy currHist array at key of storageKey to get current month
        if (!monthArr[workoutDay] || overwrite) {
          // if there's nothing in current month at idx of workoutDay, OR if there is something there but overwrite is true...
          console.log("Nothing here, or we're overwriting what's here");
          monthArr[workoutDay] = `•${myName}`; // just set the value of that idx to be out new workout name
        } else { // there's already a workout on this day + overwrite is false, so concat existing w/new workout name
          console.log("something here and we decided to concat");
          monthArr[workoutDay] = `${monthArr[workoutDay]}\n•${myName}`;
        }
        newHistObj = { ...currHist, [storageKey]: monthArr };
        window.localStorage.setItem("workoutHistory", JSON.stringify(newHistObj));
        return newHistObj; // must return an obj that will replace the obj in workoutHistory
      }
    });
    displayCurrent(); // after submitting a completed workout, redirect to display current month
  }

  // called by NewAddCompleted, clears all workoutHistory on a given date
  function deleteDayHistory(myName, myDate){
    // let daysInMonth = dayjs(myDate).daysInMonth();
    let storageKey = dayjs(myDate).format('MMMYYYY');
    let workoutDay = dayjs(myDate).format('D');
    let newHistObj = {};
    setWorkoutHistory(currHist => {
      let monthArr = [...currHist[storageKey]]; // copy currHist array at key of storageKey
      monthArr[workoutDay] = ""; // clear data from monthArr at index of workoutDay
      newHistObj = { ...currHist, [storageKey]: monthArr }; // set newHistObj to be existing history, plus mutated monthArr
      window.localStorage.setItem("workoutHistory", JSON.stringify(newHistObj));
      return newHistObj;
    });
    displayCurrent(); // after clearing all workouts from this day, redirect to display current month
  }

  return (
    <div className={styles.mainCard}>
      { showAdd && <h1 className={styles.title}>Add Workout To History</h1> }
      { showCurrent && <h1 className={styles.title}>Monthly History</h1> }
      { showHistory && <h1 className={styles.title}>All History</h1> }
      <div className={styles.buttonsDiv}>
        {
          (showCurrent || showHistory) && (
            <>
              <button
                onClick={() => displayCurrent()}
                className={`${styles.myButn} ${ showCurrent ? styles.activeButn : styles.inactiveButn }`}
              >Monthly History</button>
              <button
                onClick={() => displayHistory()}
                className={`${styles.myButn} ${ showHistory ? styles.activeButn : styles.inactiveButn }`}
              >All History
              </button>
            </>
          )
        }
      </div>
      <div className={styles.mainBox}>
        { showAdd && <NewAddCompleted
                        propDate={propDate}
                        submitCompleted={submitCompleted}
                        goBack={displayCurrent}
                        workoutHistory={workoutHistory}
                        deleteDayHistory={deleteDayHistory}
                      /> }
        { showCurrent && <CurrentMonth cellClick={goToAddDate} workoutHistory={workoutHistory}/> }
        { showHistory && <History workoutHistory={workoutHistory}/> }
      </div>
    </div>
  );
};

// <button
//   onClick={() => displayAdd()}
//   className={`${styles.myButn} ${ showAdd ? styles.activeButn : styles.inactiveButn }`}
// >Add Date</button>
