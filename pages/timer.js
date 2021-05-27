import { useState } from "react";

import Image from "next/image";
import ProgressBar from "../components/ProgressBar";

import styles from "../styles/Timer.module.css";

export default function Timer()  {
  // start with default routine loaded from local vars, later this can be loaded from localStorage
  // exercises (or rest periods) and their durations can be selected from dropdowns when using Routine Builder component
  const defaultRoutine = {
    workoutName: "Abs Routine 1",
    exercises: [
      { name: "plank", imgSrc: "plank-1.png", duration: "30" }, // <-- setting durations to strings bc when we load from localStorage, we'll be dealing with strings
      { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      { name: "leg lifts", imgSrc: "leg-lift-1.png", duration: "30" },
      { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      { name: "crunches", imgSrc: "crunch-1.png", duration: "30" },
      { name: "rest", imgSrc: "rest-1.png", duration: "5" },
      { name: "windshield wipers", imgSrc: "lunge-1.png", duration: "30" }
    ]
  };

  const [ routine, setRoutine ] = useState(defaultRoutine);
  const { workoutName, exercises } = routine; // destruc workoutName and exercises array from routine obj
  const [ rtnIdx, setRtnIdx ] = useState(0); // this is array index for the current exercise in our exercises array
  const [ countdown, setCountdown ] = useState(""); // tracks current exercise duration

  // when we click START to begin the routine, setRtnIdx to 0 -- this is used to track the current exercise we're on
  // this way we can ref exercises[rtnIdx].name, exercises[rtnIdx].imgSrc, exercises[rtnIdx].duration and so on
  // use pcOfSt8 "countdown" to track seconds remaining in current exercise, start at parseInt(exercises[rtnIdx].duration)
  // setInterval to decrement countdown once per second, until we reach 0
  // at that point, clear the interval and increment rtnIdx
  // once rtnIdx === exercises.length, the routine is finished; display a completion message


  return (
    <div className={styles.mainCard}>
      <h1 className={styles.title}>{workoutName}</h1>

      <div className={styles.timerMainBox}>
        <div className={styles.exerciseBox}>
          <div className={styles.exerciseImg}>
            <Image src={`/images/${exercises[rtnIdx].imgSrc}`} width={200} height={200} />
          </div>
          <h1>{exercises[rtnIdx].name.toUpperCase()}</h1>
        </div>

        <div className={styles.ringBox}>
          <ProgressBar duration={exercises[rtnIdx].duration}/>
          <h1>TIME LEFT: {exercises[rtnIdx].duration}</h1>
        </div>
      </div>

      <div className={styles.buttonsDiv}>
        <button className={styles.butn}>PAUSE</button>
        <button className={styles.butn}>RESET</button>
      </div>
      <h3>Up Next: {exercises[rtnIdx+1].name}</h3>
    </div>
  );
};
