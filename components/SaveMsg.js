
// we need 2 stateless components ...Warning and SaveMsg
// parent builder.js can handle 2 pcs of state, showDialog and showWarning
// when showDialog=TRUE and showWarning=TRUE, show the overwrite warning <Warning/>
// but when showDialog=TRUE and showWarning=FALSE, show the save confirmation <SaveMsg/>


export default function SaveMsg(props) {

  return (
    <>
      <h2>Saved <span className="greenSpan">{props.workoutName}</span> to localStorage</h2>
      <button onClick={props.hideDialog} className="butn">OK</button>
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
