
// we need 2 stateless components ...Warning and SaveMsg
// parent builder.js can handle 2 pcs of state, showDialog and showWarning
// when showDialog=TRUE and showWarning=TRUE, show the overwrite warning <Warning/>
// but when showDialog=TRUE and showWarning=FALSE, show the save confirmation <SaveMsg/>

// Warning.js needs workoutName var, hideWarning and hideDialog funcs

export default function Warning(props) {

  return (
    <>
      <h2><span className="greenSpan">Warning!</span> <span className="greenSpan">{props.workoutName}</span> already exists in localStorage. <span className="greenSpan">Overwrite?</span></h2>
      <button onClick={props.confirm} className="butn">YES</button>
      <button onClick={props.hideDialog} className="butn">NO</button>
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
