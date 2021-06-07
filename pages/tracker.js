
import { useState, useEffect } from "react";
import styles from "../styles/Builder.module.css";

// TO DO: add pictures for all exercises

// TO DO: add beep sound effect when 3s before end of current duration
// https://medium.com/@jerrysbusiness/playing-a-sound-file-in-a-react-project-bd0ad079ad93
// https://dev.to/daveguz97/adding-sound-to-a-react-project-51m3
// https://www.npmjs.com/package/react-sound

export default function Tracker()  {
  const [ showAdd, setShowAdd ] = useState(false);
  const [ showCurrent, setShowCurrent ] = useState(true);
  const [ showHistory, setShowHistory ] = useState(false);

  function displayAdd(){
    setShowAdd(true);
    setShowCurrent(false);
    setShowHistory(false);
  }
  function displayCurrent(){

  }
  function displayHistory(){

  }

  return (
    <div className={styles.mainCard}>
      { showAdd && <h1 className={styles.title}>Add Date</h1> }
      { showCurrent && <h1 className={styles.title}>Current Month</h1> }
      { showHistory && <h1 className={styles.title}>History</h1> }
      <div>
        <button className="butn">Add Date</button>
        <button className="butn">Current Month</button>
        <button className="butn">History</button>
      </div>
      <div className={styles.mainBox}>
      </div>
    </div>
  );
};
