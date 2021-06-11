
import styles from "../styles/CurrentMonth.module.css";
import { useState, useEffect } from "react";
import dayjs from 'dayjs'; // https://day.js.org/docs/en/display/format
import { v4 as uuidv4 } from 'uuid';

// TO DO: actually write/read/delete from localStorage (parent func inside tracker.js should be called from AddCompletedWorkout)
// ----- actually read from localStorage (parent func inside tracker.js should be called from here, in CurrentMonth)
// TO DO: enable clicking on a calendar day to change (add, delete) workout -- take user to AddCompletedWorkout, but autopop day we clicked on


export default function CurrentMonth(props) {
  const [ myCalendar, setMyCalendar ] = useState([]);
  // myCalendar is a 3D array of 5 sub-arrays, each 7 elements long
  // each element in each sub-array is an object with dayNum and workout props
  // dayNum may be "X" (if it's for a day prior to 1st or after last day of current month)
  // workout may be empty (falsy!) string, or the name of a workout completed on that date
  const [ monthYear, setMonthYear ] = useState( dayjs().format('MMMYYYY') );
  // monthYear tracks the storage key...this initializes to current month + year

  useEffect(() => {
    // function to generate a 3D array representing a calendar w/ all days for the current month
    // this func also populates "workout" prop for days that have workouts
    function generateCalendar(){
      let myTestArr = new Array(30).fill("");
      // the history array we want is inside props.workoutHistory at key of monthYear ...
      let historyArr = props.workoutHistory[monthYear] || myTestArr;
      // ...but SOMEtimes historyArr is undefined (if no hist for that month, or when component 1st loads), and if so we substitute myTestArr
      const numDaysInMonth = dayjs(monthYear).daysInMonth();// determine # of days in monthYear
      // determine what dayOfWk the 1st day in monthYear is
      const firstDay = `${dayjs(monthYear).month() + 1}-01-${dayjs(monthYear).year()}`;
      let dayOfWk = dayjs(firstDay).day(); // OUTPUT: 2 (Sun = 0, Mon = 1, Tue = 2)

      let newCalendar = [ [], [], [], [], [], [] ]; // init 3D array
      let dayNum = 1; // init var to track the day of the month

      for (let row = 0; row < newCalendar.length; row++) { // loop over calendar ROWS, while available
        for (let col = 0; col < 7; col++) { // loop over cols, while less than 7
          if (row === 0 && col < dayOfWk) { // if we're in the first row, on a day prior to 1st day of month...
            newCalendar[row][col] = {dayNum: "X", workout: ""}; // ...add obj {dayNum: "X", workout: ""} into newCalendar
          } else if (dayNum <= numDaysInMonth) { // else, if dayNum has not exceeded # of days in the month
            // add obj {dayNum: whateverTheValueOfDayNumIs, workout: valueOfMyTestArrAtIdx[valueOfDayNum] } into the calendar at [row][col]
            newCalendar[row][col] = {dayNum: dayNum, workout: historyArr[dayNum] };
            dayNum++; // and increment dayNum
          } else { // else, we've gone beyond the end of the calendar days (into the next month)
            newCalendar[row][col] = {dayNum: "X", workout: ""}; // so just add obj {dayNum: "X", workout: ""} into myCalendar at [row][col]
          }
        }
      }
      setMyCalendar(newCalendar); // set myCalendar pcOfSt8 with the newCalendar array
    };

    generateCalendar(); // call generateCalendar inside useEffect to run function defined above
    // we need props.workoutHistory in dependencies bc props are undefined on 1st render, then become defined, and we want to rerun useEffect at that time
  }, [props.workoutHistory, monthYear]);


  // called by scroll buttons on either side of calendar title, changes current month
  function changeMonthYear(increment) {
    // change the monthYear storage key to change the calendar month and corresponding history data
    setMonthYear(currMonYr => {
      let newMonYr = dayjs(currMonYr).add(increment, 'month').format('MMMYYYY');
      return newMonYr;
    });
  };

  // this func handles cell clicks, but ONLY if we're clicking valid days
  function handleCellClick(dayNum) {
    if (dayNum !== "X") {
      // create dateString and pass to parent function cellClick, which gives default date to AddCompleted component
      let dateString = `${monthYear.slice(0, 3)}-${dayNum}-${monthYear.slice(3)}`;
      props.cellClick( dayjs(dateString).format('YYYY-MM-DD') );
    }
  }

  // function that renders <div>s for each calendar row + calendar cell, and populates them with the data
  function renderCalendar(){
    // helper func that gives classes to cells based on their data
    function giveCellStyles(calObj){
      if (calObj.workout) { // if the calObj has a workout defined, give brightCell class
        return `${styles.cellBase} ${styles.brightCell}`;
      } else if (calObj.dayNum === "X") { // else, if dayNum == "X", give style deadCell (doesn't highlight, unclickable)
        return `${styles.cellBase} ${styles.deadCell}`;
      } else { // else, give style darkCell (a valid day w/no workouts completed)
        return `${styles.cellBase} ${styles.darkCell}`;
      }
    }

    let calMap = myCalendar.map((calRow, rowIdx) => {
      let calRowMap = calRow.map(calObj => {
        // check calObj.workout for "|" chars and split onto multiple lines if needed
        return (
          <div
            key={uuidv4()}
            className={ giveCellStyles(calObj) }
            onClick={ () => handleCellClick(calObj.dayNum) }
          >
            {calObj.dayNum}<br/>{calObj.workout}
          </div>
        )
      });
      return (
        <div key={rowIdx} className={styles.dayRow}>
          { calRowMap }
        </div>
      )
    });
    return calMap;
  }


  function renderDayNames(){
    const dayNames = [ "Sun", "Mon", "Tue", "Wed", "Ths", "Fri", "Sat" ];
    let dayMap = dayNames.map(dayName => (
      <div key={dayName} className={styles.dayOfWk}>{dayName}</div>
    ));
    return dayMap;
  }


  return (
    <div className={styles.mainCard}>
      <h1 className={styles.title} onClick={() => renderCalendar()}>

        <button className={styles.iconButn} onClick={() => changeMonthYear(-1)}>
          <i className="fas fa-caret-square-left"></i>
        </button>
        {dayjs(monthYear).format('MMMM YYYY')}
        <button className={styles.iconButn} onClick={() => changeMonthYear(1)}>
          <i className="fas fa-caret-square-right"></i>
        </button>

      </h1>
      <div className={styles.dayNamesRow}>
        { renderDayNames() }
      </div>
      <div>
        { renderCalendar() }
      </div>
    </div>
  );
};


      // <div
      //   key={uuidv4()}
      //   className={ `${styles.cellBase} ${calObj.workout ? styles.brightCell : styles.darkCell}` }
      // >
