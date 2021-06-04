
// completionbar component tracks how much of the workout is complete
// bar starts out as gray, then fills with red (from the left) as workout is completed

// we need to rcv as props: whole routine array, timeLeft (seconds remaining in current exercise), and current exercise's rtnIdx

// EXAMPLE:
// say timeLeft = 7 and rtnIdx = 2
// means we're 3 seconds into this exercise ----------------------------------- VVVVVVVVVVVVVVVVVVVVVVVV
// let myRoutine = [ {name: "A", duration: "10"}, {name: "B", duration: "10"}, {name: "C", duration: "10"}, {name: "D", duration: "15"}, {name: "E", duration: "10"} ]

// loop through workout, tally each duration and get totalDuration = 55
// 400 / 55 = 7.27 ...so for every 1 second elapsed out of these 55, the filler bar will need to grow by 7.27 px
// 100.55 = 1.81 ...so for every 1 second elapsed, add 1.81 percent to our completion

// take rtnIdx (2) and loop through all exercises in routine BEFORE this index, tallying their durations:
// routine[0].duration + routine[1].duration = 20
// take routine[rtnIdx].duration (10) and subtract timeLeft (7) to get the time elapsed in current duration = 3

// add these 2 numbers to get num of seconds elapsed in whole workout, 23
// 23 x 7.27px means that, at this point in the routine, the filler bar should be 167.21 px wide
// 23 x 1.81 means that, at this point in the routine, we are 41.63% complete

export default function CompletionBar({ timeLeft, routine, rtnIdx }) {
  // secondsElapsed, totalDuration, pixelIncrement, percentIncrement should be in state vars

  // totalDuration, pixelIncrement and percentIncrement only need to be calculated once per every workout routine...but secondsElapsed needs to recalculate every second
  // maybe set totalDuration, pixelIncrement and percentIncrement in a useEffect call that only runs once?

  getTotalDuration(){
    let secondsElapsed = 0;
    let totalDuration = 0;
    for (let i = 0; i < routine.length; i++) {
      // tally up each duration to get the total num of seconds in routine
      totalDuration = totalDuration + parseInt(routine[i].duration);
      if (i < rtnIdx) {
        // tally up each duration IF we're looking at elements prior to current rtnIdx, to get secondsElapsed
        secondsElapsed = secondsElapsed + parseInt(routine[i].duration);
      }
    }
    // for a final total of secondsElapsed, we have to add the duration of the current exercise, minus timeLeft
    secondsElapsed = secondsElapsed + (parseInt(routine[rtnIdx].duration) - timeLeft);
    let pixelIncrement = 400 / totalDuration;
    // secondsElapsed * pixelIncrement -- Math.floor() this -- is the total current width of the filler bar
    let percentIncrement = 100 / totalDuration;
    // secondsElapsed * percentIncrement -- Math.floor() this -- is the current workout completion percentage
  }

  return (
    <div className="completionBarBox">
      <p className="padded">Complete:</p>
      <div className="barGrayBase">
        <div className="barAnimatedFiller">
        </div>
      </div>
      <p className="padded">20%</p>
      <style jsx>{`
        .completionBarBox {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .padded {
          margin: 1rem;
        }
        /* the base color of the progress bar is gray */
        .barGrayBase {
          height: 20px;
          width: 400px;
          background-color: gray;
        }
        /* gradually the width of barAnimatedFiller increases (from left-right), hiding more of the barGrayBase until it is fully covered */
        @keyframes growBar {
          from { width: 0px; }
          to { width: 50px; }
        }
        .barAnimatedFiller {
          /* barAnimatedFiller width is initialized at "end" position bc if we pause the timer, we want it paused *after* current second has elapsed */
          height: 20px;
          width: 50px;
          background-color: red;
          animation-name: growBar;
          animation-duration: 1s;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};
