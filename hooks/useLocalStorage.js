import { useState, useEffect } from "react";
// import { demoSavedWorkouts } from "../vars/workoutVars";

export default function useLocalStorage(initialVar){
  const [ savedWorkouts, setSavedWorkouts ] = useState(""); // stores either arr of ALL workouts from localStorage, or demoSavedWorkouts arr
  const [ didLoad, setDidLoad ] = useState(false);

  // load workouts either from localStorage (if exists) or from demoSavedWorkouts, populate pcOfSt8 savedWorkouts
  useEffect(() => {
    console.log("running useEffect inside useLocalStorage hook");
    let mySavedWorkouts = JSON.parse(window.localStorage.getItem("savedWorkouts")) || initialVar;
    setSavedWorkouts(mySavedWorkouts); // set pcOfSt8 savedWorkouts
    setDidLoad(true); // setDidLoad(true) to stop this useEffect call from running repeatedly
  }, [didLoad]);

  return [ savedWorkouts, setSavedWorkouts ];
}
