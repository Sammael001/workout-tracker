// import styles from "../styles/ProgressBar.module.css";
import { useState, useEffect } from "react";

export default function ProgressBar({ barBaseHeight, timeLeft, totalDuration }) {

  function giveBarColor(){
    if (timeLeft < 5) {
      return "#ff4d4d";
    } else if (timeLeft < 10) {
      return "#ffa64d";
    } else if (timeLeft < 15) {
      return "#ffff4d";
    } else {
      return "#a6ff4d";
    }
  }
  // this animation grows smoothly from a height of ((secondsElapsed * amtToIncrease) - amtToIncrease), to (secondsElapsed * amtToIncrease), in 1 second
  // EX: animated transition from ((5*10)-10) = 40px, to (5*10) = 50px
  function getFiller(startOrEnd) {
    // divide barBaseheight by totalDuration to get amtToIncrease (EX: 300 / 30 = 10)
    const increment = barBaseHeight / totalDuration;
    // subtract secondsLeft from totalDuration to get secondsElapsed (EX: 30 - 25 = 5)
    const secondsElapsed = totalDuration - timeLeft;
    // multiply secondsElapsed by increment to get total filler height (EX: 5 * 10 = 50)
    const endFillerHeight = secondsElapsed * increment;
    if (startOrEnd === "start") {
      // to get the starting position of the filler, decrement endFillerHeight by increment (EX: 50 - 10 = 40)
      return (endFillerHeight - increment);
    } else {
      return endFillerHeight; // (EX: 50)
    }
  }

  return (
    <>
      <div className="barGreenBase">
        <div className="barAnimatedFiller">
        </div>
      </div>
      <style jsx>
      {`
        /* the base color of the progress bar is green */
        .barGreenBase {
          height: ${ barBaseHeight }px;
          width: 70px;
          background-color: ${ giveBarColor() };
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }

        /* gradually the height of barAnimatedFiller increases (from top-down), hiding more of the barGreenBase until it is fully covered */
        @keyframes growBar {
          from { height: ${ getFiller("start") }px; }
          to { height: ${ getFiller("end") }px; }
        }
        .barAnimatedFiller {
          width: 70px;
          background-color: gray;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
          height: ${ getFiller("end") }px;
          animation-name: growBar;
          animation-duration: 1s;
          animation-timing-function: linear;
        }
      `}
      </style>
    </>
  );
};

// .barGrayFiller {
//   width: 50px;
//   height: ${ getFillHeight() }px;
//   background-color: gray;
// }
//
// // to calculate <ProgressBar/> rendering values, pass down barBaseHeight, timeLeft and totalDuration
// function getFillHeight() {
//   // divide barBaseheight by totalDuration to get amtToIncrease (EX: 300 / 30 = 10)
//   const amtToIncrease = barBaseHeight / totalDuration;
//   // subtract secondsLeft from totalDuration to get secondsElapsed (EX: 30 - 25 = 5)
//   const secondsElapsed = totalDuration - timeLeft;
//   // multiply secondsElapsed by amtToIncrease to get fillHeight (EX: 5 * 10 = 50)
//   return secondsElapsed * amtToIncrease;
// }
