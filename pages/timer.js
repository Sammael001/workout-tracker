
  // TO DO: add button beside workout name which allows you to select a different workout (brings up WorkoutSelector component again)
  // TO DO: style WorkoutSelector

  // TO DO: extract timer logic, workout selection logic into 2 separate components
  // so inside this timer.js component we can return:
  // <div className={styles.mainCard}>
  //   { showMenu
  //     ? <TimerComponent />
  //     : <WorkoutSelector />
  //   }
  // </div>

  // NOTE: each whole workout obj is a WORKOUT
  // inside each WORKOUT we have a workoutName, and a ROUTINE (an array of EXERCISES)


import { useState, useEffect } from "react";

import Image from "next/image";
import Confetti from 'react-dom-confetti';

import ProgressBar from "../components/ProgressBar";
import WorkoutSelector from "../components/WorkoutSelector";
// REACT HOOKS STOPWATCH -> https://www.youtube.com/watch?v=sSWGdj8a5Fs

import { defaultWorkout, demoSavedWorkouts, confettiConfig } from "../vars/workoutVars";

// custom hook which loads data from localStorage (if found), or demoSavedWorkouts if not found
import useLocalStorage from "../hooks/useLocalStorage";

import styles from "../styles/Timer.module.css";

export default function Timer()  {
  // custom hook which loads savedWorkouts data from localStorage, if it exists...if not, loads from demoSavedWorkouts
  const [ savedWorkouts, setSavedWorkouts ] = useLocalStorage(demoSavedWorkouts);

  // if we haven't selected a workout yet, page initializes to show WorkoutSelector menu component
  const [ showMenu, setShowMenu ] = useState(true);

  // once we submit the workout selection form, these vals will be populated (defaultWorkout will be replaced then)
  const [ myWorkout, setMyWorkout ] = useState(defaultWorkout);
  const { workoutName, routine } = myWorkout; // destruc workoutName and routine array from myWorkout obj

  const [ workoutStarted, setWorkoutStarted ] = useState(false); // hides pause/reset/resume buttons when false
  const [ workoutComplete, setWorkoutComplete ] = useState(false); // triggers confetti when set to "true"
  const [ rtnIdx, setRtnIdx ] = useState(0); // this is array index for the current exercise in our routine array
  const [ timeLeft, setTimeLeft ] = useState(routine[0].duration); // tracks time remaining in current exercise
  const [ stopwatchOn, setStopwatchOn ] = useState(false); // controls whether we're calling tick()

  // called when we submit the routine selection form from <WorkoutSelector />
  function chooseWorkout(selected){
    setShowMenu(false);
    savedWorkouts.forEach(elem => {
      if (elem.workoutName === selected) {
        setMyWorkout(elem); // set myWorkout to the chosen workout obj
        setTimeLeft(elem.routine[0].duration); // set timeLeft to duration of 1st exercise in chosen workout's routine
      }
    });
  }

  // populates list of available workouts to choose from
  function giveOptions(){
    // was encountering error where savedWorkouts was NOT an array (undefined?) at first, then it was
    if (Array.isArray(savedWorkouts)) {
      const myMap = savedWorkouts.map(elem => (
        <option key={elem.workoutName} value={elem.workoutName}>{elem.workoutName}</option>
      ));
      return myMap;
    } else {
      // included this option here to prevent error "savedWorkouts.map is not a function" when trying to map an undefined var
      return <option value="foobar">foobar</option>
    }
  };

  function tick() {
    // this function will be called once a second, by setInterval, until cleared
    setTimeLeft(currTimeLeft => {
      // NOTE: we can't view timeLeft directly (always max value), so we must evaluate currTimeLeft inside cb here
      let newTimeLeft = currTimeLeft - 1; // decrement currTimeLeft by 1 (second)
      if (newTimeLeft < 0) { // if newTimeLeft is less than 0...
        if (rtnIdx + 1 >= routine.length) { // ...AND we're on the final index in the routine array
          setWorkoutComplete(true); // setWorkoutComplete(true) to fire confetti!
          setTimeout(() => {
            resetWorkout(); //...reset the workout after 3s delay (so confetti can be seen)
            console.log("congrats, exercise routine is complete");
          }, 3000);
          return 0; // return 0 to reset timeLeft
        } else { // else, we're finished with current exercise but not the whole routine
          setRtnIdx(currRtnIdx => ( currRtnIdx + 1 )); // ...increment rtnIdx method to move to next exercise...
          return routine[rtnIdx + 1].duration; // ...and return duration of NEXT exercise to setTimeLeft call
        }
      }
      // if we arrive here, the newTimeLeft is MORE than 0, so the current exercise is NOT complete
      return newTimeLeft; // so we just return newTimeLeft to our setTimeLeft call
    });
  };

  useEffect(() => {
    console.log("running useEffect to clear interval if stopwatch is off");
    let interval = null;

    if (stopwatchOn) { // if stopwatchOn, start calling tick()
      interval = setInterval(() => {
        tick(); // tick sets the timeLeft for the exercise, increments rtnIdx and/or calls setStopwatchOn as needed
      }, 1000);
    } else {
      clearInterval(interval); // clearInterval on render/re-render if stopwatchOn is false
    }

    return () => {clearInterval(interval)} // makes sure interval is cleared if we navigate away from this page
    },
    [stopwatchOn, rtnIdx] // dependencies array -- useEffect ONLY re-runs when stopwatchOn or rtnIdx are changed
  );

  function startWorkout(){
    setStopwatchOn(true);
    setWorkoutStarted(true);
  };

  function resetWorkout(){
    setStopwatchOn(false); // stop calling tick()
    setWorkoutStarted(false); // hide all buttons except start
    setWorkoutComplete(false); // reset this var to allow confetti re-triggering
    setRtnIdx(0); // reset rtnIdx to 1st exercise in array
    setTimeLeft(routine[0].duration); // reset timeLeft to duration of 1st exercise
  }

  return (
    <div className={styles.mainCard}>
    {
      showMenu
      ? <WorkoutSelector workoutChoices={ giveOptions() } chooseWorkout={chooseWorkout} />
      : <>
          <h1 className={styles.title}>
            {workoutName}
            {' '}
            <span className={styles.greenIcon} onClick={() => setShowMenu(true)}>
              <i className="fas fa-caret-square-down"></i>
            </span>
          </h1>

          <div className={styles.timerMainBox}>
            <div className={styles.exerciseBox}>
              <div className={styles.exerciseImg}>
                <Image src={`/images/${routine[rtnIdx].imgSrc}`} width={200} height={200} />
              </div>
              <h1>{routine[rtnIdx].name.toUpperCase()}</h1>
            </div>

            <Confetti className={styles.confettiOverlay} active={workoutComplete} config={confettiConfig} />

            <div className={styles.progressBarBox}>
              <ProgressBar
                barBaseHeight={300}
                timeLeft={timeLeft}
                totalDuration={routine[rtnIdx].duration}
              />
            <h1>TIME LEFT: {timeLeft}s</h1>
            </div>
          </div>

          <div>
            { !workoutStarted && <button onClick={ () => startWorkout() } className={styles.butn}>START</button> }
            {
              workoutStarted &&
              <>
                {stopwatchOn && <button onClick={ () => setStopwatchOn(false) } className={styles.butn}>PAUSE</button>}
                {!stopwatchOn && <button onClick={ () => setStopwatchOn(true) } className={styles.butn}>RESUME</button>}
                <button onClick={ () => resetWorkout() } className={styles.butn}>RESET</button>
              </>
            }
          </div>
          { routine[rtnIdx+1] && <h3>Up Next: {routine[rtnIdx+1].name}</h3> }
        </>
    }

    </div>
  );
};
