
export default function Delete({ workoutName, workoutID, yesDelete, cxlDelete }) {

  // here inside this file, check if workoutID is 001, 002, 003 or 004
  // if so, display error msg (and hide buttons)
  // else, allow users to click OK (to call parent function deleteWorkout) or CXL (to call parent function hideDialog)

  return (
    <>{
        (workoutID === "001" || workoutID === "002" || workoutID === "003" || workoutID === "004")
        ? (<>
            <h2><span className="greenSpan">{workoutName}</span> is not saved to localStorage, and can't be deleted</h2>
            <button onClick={cxlDelete} className="butn">OK</button>
          </>)
        : (<>
            <h2>Delete workout with name <span className="greenSpan">{workoutName}</span>?</h2>
            <button onClick={yesDelete} className="butn">YES</button>
            <button onClick={cxlDelete} className="butn">NO</button>
          </>)
      }

      <style jsx>
        {`
          .greenSpan {
            color: #bfff80;
            letter-spacing: 0.1rem;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};
