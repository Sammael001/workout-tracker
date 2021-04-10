console.log("Hello world!");

// Three pages for the app: Timer, Builder, Tracker
// 1) Workout Timer, a page with start/stop buttons which shows the name (and pic/gif) of each exercise, drawing the data from saved "routines". This page counts down for 30 seconds per exercise, then allows 30 seconds rest before moving on to the next exercise in the routine. The page should also show how much time is remaining until the workout is complete. (Eventually, once the workout is complete, the page should allow you to save your completed workout, and the date it was completed, to your localStorage)
// 2) Routine Builder, a form which lets you select workout exercises from a dropdown and add them to a routine, which can be saved into localStorage
// 3) Workout Tracker, a page which shows each routine completed on each date, drawing from localStorage

let routine = [
  { name: "reverse crunches", img: "reverse-crunches.gif" },
  { name: "plank", img: "plank.jpg" },
  { name: "scissor kicks", img: "scissor-kicks.gif" }
];
// since we have 30 second exercise and 30 second rest, each exercise represents 1 minute
// routine.length = # of minutes to complete each routine

let seconds = 10; // init global var seconds at 10 .. TODO: update this to 60 in finished app
let isPaused = false; // global boolean to check if the timer is paused
let newExNum; // init newExNum to hold duplicated value of exNum, in case we pause the timer

function countdown(exNum){
  // helper func tick() -- checks if isPaused, clears old timers,
  function tick() {
    if (isPaused) {
      console.log(`Countdown timer is paused on exercise ${routine[exNum].name} at ${seconds} seconds.`);
      clearInterval(myTimer); // stop the timer so we don't have duplicate timers running
      // "seconds" will retain its value until resumeCountdown() calls countdown(newExNum)
    } else if (seconds <= 0) {
      seconds = 10; // reset time
      clearInterval(myTimer); // stop the timer
      exNum++; // increment exNum to move on to the next exercise
      setExercise(exNum); // call setExercise again
    } else if (seconds <= 5 ) {
      console.log(`REST: ${seconds} seconds remaining`);
      seconds--;
    } else {
      console.log(`EXERCISE: ${seconds} seconds remaining`);
      seconds--;
    }
  }
  // call setInterval and pass in helper func tick(), capture myTimer so we can clearInterval(myTimer) above
  let myTimer = setInterval(tick, 1000);
};

// startWorkout calls setExercise(0) to initiate the workout
function setExercise(exNum){
  // create dup value of exNum and store as global 'newExNum', so resumeCountdown can call countdown(newExNum)
  newExNum = exNum;
  let currEx = routine[exNum];
  let nextEx = routine[exNum + 1];
  if (exNum === routine.length) {
    console.log("You finished your routine!");
  } else if (exNum === routine.length - 1) {
    console.log(`Current exercise is ${currEx.name}, your last exercise`);
    countdown(exNum);
  } else {
    console.log(`Current exercise is ${currEx.name}`);
    console.log(`Next up: ${nextEx.name}`);
    countdown(exNum);
  }
}

function pauseCountdown() {
  isPaused = true;
}
function resumeCountdown() {
  isPaused = false;
  // console.log(`Current # of seconds: ${seconds}`);
  countdown(newExNum);
}
