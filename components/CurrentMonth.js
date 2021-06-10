
import styles from "../styles/CurrentMonth.module.css";
import { useState, useEffect } from "react";
import dayjs from 'dayjs'; // https://day.js.org/docs/en/display/format
import { v4 as uuidv4 } from 'uuid';

// TO DO: add arrows that allow moving back + forth to different calendar months

// TO DO: actually write/read/delete from localStorage (parent func inside tracker.js should be called from AddCompletedWorkout)
// ----- actually read from localStorage (parent func inside tracker.js should be called from here, in CurrentMonth)
// TO DO: enable clicking on a calendar day to change (add, delete) workout -- take user to AddCompletedWorkout, but autopop day we clicked on


// import workoutHistory from localStorage, if available
// if not, display error message
// filter/parse dates with dayJS

export default function CurrentMonth(props) {
  const [ myCalendar, setMyCalendar ] = useState([]);
  // myCalendar is a 3D array of 5 sub-arrays, each 7 elements long
  // each element in each sub-array is an object with dayNum and workout props
  // dayNum may be "X" (if it's for a day prior to 1st or after last day of current month)
  // workout may be empty (falsy!) string, or the name of a workout completed on that date


  useEffect(() => {
    // function to generate a 3D array representing a calendar w/ all days for the current month
    // this func also populates workout prop for days that have workouts
    function generateCalendar(){
      let myTestArr = [ "", "", "", "", "Abs Workout", "", "", "", "", "", "", "", "", "Legs Workout", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]; // this array has 31 values and represents a 30-day month...arr[0] will always be empty
      // "Abs Workout" is at idx 4 b/c workout was completed Jun-04-2021 ... "Legs Workout" at idx 13 b/c it was completed Jun-13-2021

      const numDaysInMonth = dayjs().daysInMonth();// determine # of days in month
      // determine what dayOfWk the 1st day in month is
      const firstDay =  `${dayjs().month() + 1}-01-${dayjs().year()}`; // OUTPUT: 6-01-2021
      let dayOfWk = dayjs(firstDay).day(); // OUTPUT: 2 (Sun = 0, Mon = 1, Tue = 2)

      let newCalendar = [ [], [], [], [], [] ]; // init 3D array
      let dayNum = 1; // init var to track the day of the month
      for (let row = 0; row < newCalendar.length; row++) { // loop over calendar ROWS, while available
        for (let col = 0; col < 7; col++) { // loop over cols, while less than 7
          if (row === 0 && col < dayOfWk) { // if we're in the first row, on a day prior to 1st day of month...
            newCalendar[row][col] = {dayNum: "X", workout: ""}; // ...add obj {dayNum: "X", workout: ""} into newCalendar
          } else if (dayNum <= numDaysInMonth) { // else, if dayNum has not exceeded # of days in the month
            // add obj {dayNum: whateverTheValueOfDayNumIs, workout: valueOfMyTestArrAtIdx[valueOfDayNum] } into the calendar at [row][col]
            newCalendar[row][col] = {dayNum: dayNum, workout: myTestArr[dayNum] };
            dayNum++; // and increment dayNum
          } else { // else, we've gone beyond the end of the calendar days (into the next month)
            newCalendar[row][col] = {dayNum: "X", workout: ""}; // so just add obj {dayNum: "X", workout: ""} into myCalendar at [row][col]
          }
        }
      }
      // set myCalendar pcOfSt8 with the newCalendar array
      setMyCalendar(newCalendar);
    };

    generateCalendar(); // call generateCalendar inside useEffect with empty dependency array
    // so we run generateCalendar ONCE when component mounts, to populate myCalendar in the state
  }, []);



  // function that renders <div>s for each calendar row + calendar cell, and populates them with the data
  function renderCalendar(){
    let calMap = myCalendar.map((calRow, rowIdx) => {
      let calRowMap = calRow.map(calObj => (
        <div
          key={uuidv4()}
          className={ `${styles.cellBase} ${calObj.workout ? styles.brightCell : styles.darkCell}` }
        >
          {calObj.dayNum}<br/>{calObj.workout}
        </div>)
      );
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
      <h1 className={styles.title} onClick={() => renderCalendar()}>{dayjs().format('MMMM YYYY')}</h1>
      <div className={styles.dayNamesRow}>
        { renderDayNames() }
      </div>
      <div>
        { renderCalendar() }
      </div>
    </div>
  );
};
