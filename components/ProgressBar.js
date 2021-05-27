// import styles from "../styles/ProgressBar.module.css";
import { useState, useEffect } from "react";

// TO DO: move this timer logic into parent timer.js
// this ProgressBar should only receive fillHeight after the value is already calculated

export default function ProgressBar({ duration }) {
  const [ fillHeight, setFillHeight ] = useState(0);
  const [ timerOn, setTimerOn ] = useState(false);
  const barBaseHeight = 300;
  // we receive duration from parent timer.js
  // take barBaseHeight (ex: 300) and divide by duration (ex: 30) to get amtToIncrease (ex: 10)
  const amtToIncrease = barBaseHeight / duration;

  // increase fillHeight by amtToIncrease every second...unless fillHeight >= barBaseHeight
  // in that case, stop the timer and call a parent method to initiate the next exercise
  useEffect(() => {
    // https://www.youtube.com/watch?v=sSWGdj8a5Fs
    console.log("running useEffect!");
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setFillHeight(prevFillHeight => prevFillHeight + amtToIncrease)
        // instead of directly calling setFillHeight, call helper func tick()
        // tick evaluates whether to reset setFillHeight to 0 (if it's about to exceed barBaseHeight) or to increment fillHeight
      }, 1000);
    } else {
      clearInterval(interval); // makes sure interval is cleared if we navigate away from this page
    }

    function tick() {
      // this function will be called once a second, by setInterval, until cleared
      // this function first checks if fillHeight <= barBaseHeight
          // if so, here we setFillHeight(prevFillHeight => prevFillHeight + amtToIncrease)
      // else, fillHeight is at or greater than barBaseHeight
          // in that case, set fillHeight to 0 and call parent method that asks for next exercise; will obtain new duration prop and force a rerender
      // we'll still have an issue with the timer not automatically restarting each time a new exercise is given...
      //...we may resolve this by passing in a prop which is FALSE for the 1st exercise and TRUE for others, which is taken as the initial value for the "timerOn" pcOfSt8
    }

    return () => {clearInterval(interval)}
  }, [timerOn]); // useEffect ONLY runs when timer is started or stopped


  return (
    <>
      <div className="barBase">
        <div className="barFilled">
        </div>
      </div>
      <div>
        <h3>{fillHeight}</h3>
        <button onClick={() => setTimerOn(true)}>Start</button>
        <button onClick={() => setTimerOn(false)}>Stop</button>
        <button onClick={() => setTimerOn(true)}>Resume</button>
        <button onClick={() => setFillHeight(0)}>Reset</button>
      </div>
      <style jsx>
      {`
        /* the base color of the progress bar is green */
        .barBase {
          height: ${barBaseHeight}px;
          width: 50px;
          background-color: #a6ff4d;
        }

        /* gradually the height of barFilled should increase, hiding more of the barBase until it is fully covered */
        .barFilled {
          width: 50px;
          height: ${fillHeight}px;
          background-color: gray;
        }
        `}
      </style>
    </>
  );
};
