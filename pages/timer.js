

// NOTE: each whole workout obj is a WORKOUT
// inside each WORKOUT we have a workoutName, and a ROUTINE (an array of EXERCISES)


// TO DO: add beep sound effect when 3s before end of current duration
// https://medium.com/@jerrysbusiness/playing-a-sound-file-in-a-react-project-bd0ad079ad93
// https://dev.to/daveguz97/adding-sound-to-a-react-project-51m3
// https://www.npmjs.com/package/react-sound

import { useState, useEffect } from "react";

import Image from "next/image";
import Confetti from 'react-dom-confetti';

import CompletionBar from "../components/CompletionBar";
import ProgressBar from "../components/ProgressBar";
import WorkoutSelector from "../components/WorkoutSelector";
// REACT HOOKS STOPWATCH -> https://www.youtube.com/watch?v=sSWGdj8a5Fs

import { defaultWorkout, confettiConfig } from "../vars/workoutVars";

import styles from "../styles/Timer.module.css";

export default function Timer()  {
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
  function chooseWorkout(selectedWorkoutObj){
    setShowMenu(false);
    setMyWorkout(selectedWorkoutObj); // set myWorkout to the chosen workout obj
    setTimeLeft(selectedWorkoutObj.routine[0].duration); // set timeLeft to duration of 1st exercise in chosen workout's routine
  }

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


  // somehow the useEffect calls inside CompletionBar are causing bugs where rtnIdx (inside PARENT) is skipping ahead???
  // when we don't call useEffect inside child component, the bug does not occur
  // that's why we calculate total workout duration, secondsElapsed, pixelInc and percentInc inside parent
  function giveCompletionBarProps() {
    let totalDur = 0;
    let secondsEl = 0;
    let pixelInc = 0;
    let percentInc = 0;
    for (let i = 0; i < routine.length; i++) {
      // tally up each duration to get the total num of seconds in routine
      totalDur = totalDur + parseInt(routine[i].duration);
      if (i < rtnIdx) {
        // tally up all durations in routine PRIOR to current rtnIdx
        secondsEl = secondsEl + parseInt(routine[i].duration);
      }
    }
    // for a final total of secondsEl, we have to add the duration of the current exercise, minus timeLeft
    secondsEl = secondsEl + (parseInt(routine[rtnIdx].duration) - timeLeft);
    // console.log(`Seconds elapsed: ${secondsEl}`);
    pixelInc = 400 / totalDur;
    // secondsEl * pixelInc -- Math.floor() this -- is the total current width of the filler bar
    percentInc = 100 / totalDur;
    // secondsEl * percentInc -- Math.floor() this -- is the current workout completion percentage
    // console.log(`TotalDuration: ${totalDur}`);
    return { secondsEl: secondsEl, pixelInc: pixelInc, percentInc: percentInc };
  }

  return (
    <div className={styles.mainCard}>
    {
      showMenu
      ? <WorkoutSelector chooseWorkout={chooseWorkout} />
      : <>
          <h1 className={styles.title}>
            {workoutName}
            {' '}
            <button className={styles.greenIcon} onClick={() => setShowMenu(true)} disabled={stopwatchOn}>
              <i className="fas fa-caret-square-down"></i>
            </button>
          </h1>

           <CompletionBar myProps={giveCompletionBarProps()} />


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
            { !workoutStarted && <button onClick={ () => startWorkout() } className="butn">START</button> }
            {
              workoutStarted &&
              <>
                {stopwatchOn && <button onClick={ () => setStopwatchOn(false) } className="butn">PAUSE</button>}
                {!stopwatchOn && <button onClick={ () => setStopwatchOn(true) } className="butn">RESUME</button>}
                <button onClick={ () => resetWorkout() } className="butn">RESET</button>
              </>
            }
          </div>
          { routine[rtnIdx+1] &&
            <div className={styles.nextPreview}>
              <h2>Up Next: <span className={styles.greenSpan}>{routine[rtnIdx+1].name.toUpperCase()}</span></h2>
              <div className={styles.exerciseThumbnail}>
                <Image src={`/images/${routine[rtnIdx+1].imgSrc}`} width={100} height={100} />
              </div>
            </div>
          }
        </>
    }

    </div>
  );
};
