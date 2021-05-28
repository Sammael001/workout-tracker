// import styles from "../styles/ProgressBar.module.css";
import { useState, useEffect } from "react";

// TO DO: move this timer logic into parent timer.js
// this ProgressBar should only receive fillHeight after the value is already calculated

export default function ProgressBar({ barBaseHeight, timeLeft, totalDuration }) {
  // to calculate <ProgressBar/> rendering values, pass down barBaseHeight, timeLeft and totalDuration
  function getFillHeight() {
    // divide barBaseheight by totalDuration to get amtToIncrease (EX: 300 / 30 = 10)
    const amtToIncrease = barBaseHeight / totalDuration;
    // subtract secondsLeft from totalDuration to get secondsElapsed (EX: 30 - 25 = 5)
    const secondsElapsed = totalDuration - timeLeft;
    // multiply secondsElapsed by amtToIncrease to get fillHeight (EX: 5 * 10 = 50)
    return secondsElapsed * amtToIncrease;
  }
  // TO DO: in keeping with the code below, have getFillHeight return an array with 2 vars, startFillHeight and endFillHeight
  // animate transition between the two

  // TO DO:
  // 1) pass in additional prop "stopwatchOn" which determines if bar should be animating or not (prevents animation firing when page is loaded)
  // *) assign static (non-animating) class if !stopwatchOn
  // 2) barFilledGray animation should grow smoothly from a height of ((secondsElapsed * amtToIncrease) - amtToIncrease), to (secondsElapsed * amtToIncrease), in 1 second
  // EX: animate transition from ((5*10)-10) = 40(px), to (5*10) = 50(px)

  return (
    <>
      <div className="barBase">
        <div className="barFilled">
        </div>
      </div>
      <style jsx>
      {`
        /* the base color of the progress bar is green */
        .barBase {
          height: ${ barBaseHeight }px;
          width: 50px;
          background-color: #a6ff4d;
        }

        /* gradually the height of barFilled should increase, hiding more of the barBase until it is fully covered */
        .barFilled {
          width: 50px;
          height: ${ getFillHeight() }px;
          background-color: gray;
        }
      `}
      </style>
    </>
  );
};


// the following code is broken: the animation begins as soon as the page loads, and does not stop when the timer is paused
// /* the base color of the progress bar is green */
// .barGreenBase {
//   height: ${ barBaseHeight }px;
//   width: 50px;
//   background-color: #a6ff4d;
// }
//
// @keyframes growBar {
//   from {height: 1px;}
//   to {height: ${ barBaseHeight }px;}
// }
//
// /* gradually the height of barFilled should increase, hiding more of the barGreenBase until it is fully covered */
// .barFilledGray {
//   width: 50px;
//   height: 1px;
//   background-color: gray;
//   animation-name: growBar;
//   animation-duration: ${totalDuration}s;
//   animation-timing-function: linear;
// }
