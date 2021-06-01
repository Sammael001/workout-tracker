

  // TO DO: extract timer logic, workout selection logic into 2 separate components
  // so inside this timer.js component we can return:
  // <div className={styles.mainCard}>
  //   { haveSelected
  //     ? <TimerComponent />
  //     : <SelectRoutine />
  //   }
  // </div>


import { useState, useEffect } from "react";

import Image from "next/image";
import Confetti from 'react-dom-confetti';
// TO DO: export confettiConfig to another file?

import ProgressBar from "../components/ProgressBar";
// REACT HOOKS STOPWATCH -> https://www.youtube.com/watch?v=sSWGdj8a5Fs

import styles from "../styles/Timer.module.css";

export default function Timer()  {
  // exercises (or rest periods) and their durations can be selected from dropdowns when using Routine Builder component
  const defaultRoutine = {
    workoutName: "Abs Routine 1",
    exercises: [
      { name: "plank", imgSrc: "plank-1.png", duration: "20" }, // <-- setting durations to strings bc when we load from localStorage, we'll be dealing with strings
      { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      { name: "leg lifts", imgSrc: "leg-lift-1.png", duration: "20" },
      // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      // { name: "crunches", imgSrc: "crunch-1.png", duration: "15" },
      // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      // { name: "windshield wipers", imgSrc: "lunge-1.png", duration: "15" }
    ]
  };

  const demoSavedWorkouts = [
    {
      workoutName: "Demo Abs Workout",
      exercises: [
        { name: "plank", imgSrc: "plank-1.png", duration: "20" },
        { name: "rest", imgSrc: "rest-1.png", duration: "5" },
        { name: "crunches", imgSrc: "crunch-1.png", duration: "20" }
      ]
    },
    {
      workoutName: "Demo Legs Workout",
      exercises: [
        { name: "leg lifts", imgSrc: "leg-lift-1.png", duration: "20" },
        { name: "rest", imgSrc: "rest-1.png", duration: "5" },
        { name: "lunges", imgSrc: "lunge-1.png", duration: "20" }
      ]
    }
  ];

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const [ savedWorkouts, setSavedWorkouts ] = useState(""); // stores either arr of workouts from localStorage, or demoSavedWorkouts arr
  const [ didLoad, setDidLoad ] = useState(false); // var which keeps one useEffect call from running multiple times

  // load workouts either from localStorage (if exists) or from demoSavedWorkouts, populate pcOfSt8 savedWorkouts
  useEffect(() => {
    let mySavedWorkouts = JSON.parse(window.localStorage.getItem("savedWorkouts")) || demoSavedWorkouts;
    setSavedWorkouts(mySavedWorkouts); // set pcOfSt8 savedWorkouts
    setDidLoad(true); // setDidLoad(true) to stop this useEffect call from running repeatedly
  }, [didLoad]);

  // if we haven't selected a workout yet, page initializes with selection prompt
  const [ haveSelected, setHaveSelected ] = useState(false);
  // once a routine name has been chosen, it will be stored as 'selectedRoutine'
  const [ selectedRoutine, setSelectedRoutine ] = useState("");

  // once we submit the routine selection form, these vals will be populated (we can remove defaultRoutine var then)
  const [ routine, setRoutine ] = useState(defaultRoutine);
  const { workoutName, exercises } = routine; // destruc workoutName and exercises array from routine obj

  const [ workoutStarted, setWorkoutStarted ] = useState(false); // hides pause/reset/resume buttons when false
  const [ workoutComplete, setWorkoutComplete ] = useState(false); // triggers confetti when set to "true"
  const [ rtnIdx, setRtnIdx ] = useState(0); // this is array index for the current exercise in our exercises array
  const [ timeLeft, setTimeLeft ] = useState(exercises[0].duration); // tracks time remaining in current exercise
  const [ stopwatchOn, setStopwatchOn ] = useState(false); // controls whether we're calling tick()


  function handleChange(evt){
    setSelectedRoutine(evt.target.value);
  }

  // called when we submit the routine selection form
  function chooseRoutine(evt){
    evt.preventDefault();
    setHaveSelected(true);
    console.log(`selectedRoutine: ${selectedRoutine}`);
    // DO THIS HERE: loop through savedWorkouts arr, find one with key of selectedRoutine, store as myObj
    // call setRoutine with that obj (which contains workoutName and exercises array)
  }

  // populates list of available routines to choose from
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


  // to calculate <ProgressBar/> rendering values, pass down barBaseHeight, timeLeft and exercises[rtnIdx].duration
  // divide barBaseheight by duration to get amtToIncrease (EX: 300 / 30 = 10)
  // subtract secondsLeft from duration to get secondsElapsed (EX: 30 - 25 = 5)
  // multiply secondsElapsed by amtToIncrease to get fillHeight (EX: 5 * 10 = 50)
  const barBaseHeight = 300;

  function tick() {
    // this function will be called once a second, by setInterval, until cleared
    setTimeLeft(currTimeLeft => {
      // NOTE: we can't view timeLeft directly (always max value), so we must evaluate currTimeLeft inside cb here
      let newTimeLeft = currTimeLeft - 1; // decrement currTimeLeft by 1 (second)
      if (newTimeLeft < 0) { // if newTimeLeft is less than 0...
        if (rtnIdx + 1 >= exercises.length) { // ...AND we're on the final index in the exercises array
          setWorkoutComplete(true); // setWorkoutComplete(true) to fire confetti!
          setTimeout(() => {
            resetWorkout(); //...reset the workout after 3s delay (so confetti can be seen)
            console.log("congrats, exercise routine is complete");
          }, 3000);
          return 0; // return 0 to reset timeLeft
        } else { // else, we're finished with current exercise but not the whole routine
          setRtnIdx(currRtnIdx => ( currRtnIdx + 1 )); // ...increment rtnIdx method to move to next exercise...
          return exercises[rtnIdx + 1].duration; // ...and return duration of NEXT exercise to setTimeLeft call
        }
      }
      // if we arrive here, the newTimeLeft is MORE than 0, so the current exercise is NOT complete
      return newTimeLeft; // so we just return newTimeLeft to our setTimeLeft call
    });
  };

  useEffect(() => {
    console.log("running useEffect!");
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
    setTimeLeft(exercises[0].duration); // reset timeLeft to duration of 1st exercise
  }

  return (
    <div className={styles.mainCard}>
    {
      haveSelected
      ? <>
          <h1 className={styles.title}>{workoutName}</h1>

          <div className={styles.timerMainBox}>
            <div className={styles.exerciseBox}>
              <div className={styles.exerciseImg}>
                <Image src={`/images/${exercises[rtnIdx].imgSrc}`} width={200} height={200} />
              </div>
              <h1>{exercises[rtnIdx].name.toUpperCase()}</h1>
            </div>

            <Confetti className={styles.confettiOverlay} active={workoutComplete} config={confettiConfig} />

            <div className={styles.progressBarBox}>
              <ProgressBar
                barBaseHeight={barBaseHeight}
                timeLeft={timeLeft}
                totalDuration={exercises[rtnIdx].duration}
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
          { exercises[rtnIdx+1] && <h3>Up Next: {exercises[rtnIdx+1].name}</h3> }
        </>
      : <>
          <form onSubmit={chooseRoutine}>
            <select name="selectedRoutine" value={selectedRoutine} onChange={handleChange} required>
              <option value=""></option>
              { giveOptions() }
            </select>
            <button type="submit">OK</button>
          </form>
        </>
    }

    </div>
  );
};

// <option value="Abs 1">Abs 1</option>
// <option value="Legs 2">Legs 2</option>
// <option value="Core 3">Core 3</option>

// when we click START to begin the routine, setRtnIdx to 0 -- this is used to track the current exercise we're on
// this way we can ref exercises[rtnIdx].name, exercises[rtnIdx].imgSrc, exercises[rtnIdx].duration and so on
// use pcOfSt8 "timeLeft" to track seconds remaining in current exercise, start at parseInt(exercises[rtnIdx].duration)
// setInterval to decrement countdown once per second, until we reach 0
// at that point, clear the interval and increment rtnIdx
// once rtnIdx === exercises.length, the routine is finished; display a completion message
