
// completionbar component tracks how much of the workout is complete
// bar starts out as gray, then fills with red (from the left) as workout is completed

export default function CompletionBar({ myProps }) {
  const { secondsEl, pixelInc, percentInc } = myProps;
  // somehow the useEffect calls -inside- CompletionBar are causing bugs where rtnIdx (inside PARENT) is skipping ahead???
  // when we don't call useEffect inside child component, the bug does not occur
  // that's why we calculated total workout duration, secondsElapsed, pixelInc and percentInc inside parent timer.js

  return (
    <div className="completionBarBox">
      <p className="padded">Complete:</p>
      <div className="barGrayBase">
        <div className="barAnimatedFiller">
        </div>
      </div>
      <p className="padded">{Math.floor(percentInc * secondsEl)}%</p>
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
          from { width: ${(pixelInc * secondsEl) - pixelInc}px; }
          to { width: ${pixelInc * secondsEl}px; }
        }
        .barAnimatedFiller {
          /* barAnimatedFiller width is initialized at "end" position bc if we pause the timer, we want it paused *after* current second has elapsed */
          height: 20px;
          width: ${pixelInc * secondsEl}px;
          background-color: red;
          animation-name: growBar;
          animation-duration: 1s;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};
